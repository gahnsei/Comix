require(`dotenv`).config();
const axios = require(`axios`);
const md5 = require(`md5`);
const Sequelize = require(`sequelize`);

const { privateKey, apikey, DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const baseUrl = `http://gateway.marvel.com/v1/public/`;

let ts = new Date();
ts = ts.toUTCString();

const hash = md5(ts + privateKey + apikey);

const BODY = {
  params: {
    ts,
    apikey,
    hash
  }
};

const marvelApi = async (offset) => {
  const res = await axios.get(
    baseUrl + `characters?offset=${offset}&limit=100`,
    BODY
  );
  console.log(res.data);
  const characters = res.data.data.results;
  const filteredCharacters = characters.filter((ele) => ele.description);

  filteredCharacters.forEach(async (ele) => {
    const charName = ele.name.replace(/'/g, `''`);
    const marvelId = ele.id;
    const description = ele.description.replace(/'/g, `''`);
    const image =
      ele.thumbnail.path + `/portrait_incredible.` + ele.thumbnail.extension;
    const marvelURL = ele.urls[0].url;

    const dbRes = await sequelize.query(`
        INSERT INTO Characters
        (name, marvel_id, description, image, marvel_url)
        VALUES
        ('${charName}', ${+marvelId}, '${description}', '${image}', '${marvelURL}')
        RETURNING id;
     `);

    const dbId = dbRes[0][0].id;

    let i = 0;

    while (i < 10 && i < ele.series.items.length) {
      const comic = ele.series.items[i];
      comicSearch(comic, dbId);
      i++;
    }
  });
};

const comicSearch = async (comic, characterId) => {
  const res = await axios.get(comic.resourceURI, BODY);
  const comicInfo = res.data.data.results[0];

  if (comicInfo.description) {
    const title = comicInfo.title.replace(/'/g, `''`);
    const marvelId = comicInfo.id;
    const description = comicInfo.description.replace(/'/g, `''`);
    const releaseDate = `1/01/` + comicInfo.startYear;
    const image =
      comicInfo.thumbnail.path +
      `/portrait_incredible.` +
      comicInfo.thumbnail.extension;

    const checkDb = await sequelize.query(`
        SELECT * FROM Comics
        WHERE name = '${title}';
      `);

    if (checkDb[0].length > 0) {
      const comicId = checkDb[0][0].id;
      sequelize.query(`
          INSERT INTO Comic_Characters
          (comic_id, character_id)
          VALUES ( ${comicId} ,${characterId} );
        `);
    } else {
      const addComic = await sequelize.query(`
      INSERT INTO Comics
        (name, marvel_id, description, release_date, image)
        VALUES
        ('${title}', ${+marvelId}, '${description}', '${releaseDate}', '${image}')
        RETURNING id;
      `);

      const comicId = addComic[0][0].id;

      sequelize.query(`
        INSERT INTO Comic_Characters
        (comic_id, character_id)
        VALUES
        (${comicId} , ${characterId})
        ;
        `);
    }
  }
};

const addAllCharacters = async () => {
  let i = 1500;
  while (i < 1600) {
    await marvelApi(i);
    i += 100;
  }
};
