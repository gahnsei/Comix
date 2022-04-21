const { nanoid } = require(`nanoid`);
require(`dotenv`).config();
const bcrypt = require(`bcryptjs`);
const Sequelize = require(`sequelize`);
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const welcome = (__req, res) => {
  res.sendStatus(200);
};

const searchCharacters = (req, res) => {
  let { limit, q } = req.query;

  q = q.toLowerCase();

  sequelize
    .query(
      `
    SELECT * 
    FROM Characters
    WHERE lower(name) LIKE '%${q}%'
    ${limit ? `LIMIT ${limit}` : ``};
      `
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const searchComics = (req, res) => {
  let { limit, q } = req.query;

  q = q.toLowerCase();

  sequelize
    .query(
      `
    SELECT * 
    FROM Comics
    WHERE lower(name) LIKE '%${q}%'
    ${limit ? `LIMIT ${limit}` : ``};
      `
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const getComics = (req, res) => {
  const { limit, orderBy, id } = req.query;

  sequelize
    .query(
      `
    SELECT * FROM Comics
    ${id ? `WHERE id = ${+id}` : ``}
    ${orderBy ? `ORDER BY ${orderBy}` : ``}
    ${limit ? `LIMIT ${limit}` : ``};`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const getCharacter = (req, res) => {
  const { limit, orderBy, id } = req.query;

  sequelize
    .query(
      `
      SELECT * FROM Characters
      ${id ? `WHERE id = ${+id}` : ``}
      ${orderBy ? `ORDER BY ${orderBy}` : ``}
      ${limit ? `LIMIT ${limit}` : ``};`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const getCharacterComics = (req, res) => {
  const { limit, orderBy, id } = req.query;

  sequelize
    .query(
      `
        SELECT * FROM Comic_characters cc
        JOIN Comics c
        ON cc.comic_id = c.id
        ${id ? `WHERE cc.character_id = ${+id}` : ``}
        ${orderBy ? `ORDER BY ${orderBy}` : ``}
        ${limit ? `LIMIT ${limit}` : ``};`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const getComicCharacters = (req, res) => {
  const { limit, orderBy, id } = req.query;

  sequelize
    .query(
      `
        SELECT * FROM Comic_characters cc
        JOIN Characters c
        ON cc.character_id = c.id
        ${id ? `WHERE cc.comic_id = ${+id}` : ``}
        ${orderBy ? `ORDER BY ${orderBy}` : ``}
        ${limit ? `LIMIT ${limit}` : ``};`
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.status(400).send(err));
};

const addUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  const userId = nanoid();
  const salt = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(password, salt);

  const dbRes = await sequelize.query(`
    SELECT * FROM Users
    WHERE lower(email) = '${email.toLowerCase()}'
  `);

  const user = dbRes[0];

  if (user.length === 0) {
    sequelize
      .query(
        `INSERT INTO Users 
    (user_id, first_name, last_name, email, password)
    VALUES 
    ('${userId}', '${firstName}', '${lastName}', '${email}', '${password}')
    RETURNING *;
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => res.status(400).send(err));
  } else {
    const rand = Math.random();
    return res.status(400).send(`Email Already Exists ${rand}`);
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.query;

  const dbRes = await sequelize.query(
    `SELECT * FROM Users
    WHERE lower(email) = '${email}';`
  );

  const user = dbRes[0];

  if (user.length === 0) {
    const rand = Math.random();
    return res.status(404).send(`User Not Found ${rand}`);
  } else {
    const rand = Math.random();
    let userPassword = user[0].password;
    const compare = bcrypt.compareSync(password, userPassword);
    return compare
      ? res.status(200).send(user)
      : res.status(400).send(`Incorrect Password ${rand}`);
  }
};

const getUserFavComic = (req, res) => {
  const { userId } = req.query;
  sequelize
    .query(
      `
    SELECT * FROM User_Comics uc
    JOIN Comics c
    ON c.id = uc.comic_id
    WHERE uc.user_id = ${+userId};
  `
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.sendStatus(400));
};

const getUserFavCharacter = (req, res) => {
  const { userId } = req.query;
  sequelize
    .query(
      `
    SELECT * FROM User_Characters uc
    JOIN Characters c
    ON c.id = uc.character_id
    WHERE uc.user_id = ${+userId};
  `
    )
    .then((dbRes) => res.status(200).send(dbRes[0]))
    .catch((err) => res.sendStatus(400));
};

const addFavComic = async (req, res) => {
  const { userId, comicId } = req.body;

  sequelize
    .query(
      `
  INSERT INTO User_Comics
  (user_id, comic_id)
  VALUES
  (${+userId}, ${comicId});
  `
    )
    .then((dbRes) => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
};

const addFavCharacter = async (req, res) => {
  const { userId, charId } = req.body;

  sequelize
    .query(
      `
  INSERT INTO User_Characters
  (user_id, character_id)
  VALUES
  (${+userId}, ${charId});
  `
    )
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
};

const removeFavComic = (req, res) => {
  const { userId, comicId } = req.query;

  sequelize
    .query(
      `
  DELETE FROM User_Comics
  WHERE user_id = ${+userId}
  AND comic_id = ${+comicId};
  `
    )
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
};

const removeFavCharacter = (req, res) => {
  const { userId, charId } = req.query;

  sequelize
    .query(
      `
  DELETE FROM User_Characters
  WHERE user_id = ${+userId}
  AND character_id = ${+charId};
  `
    )
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
};

module.exports = {
  welcome,
  searchCharacters,
  searchComics,
  getComics,
  getCharacter,
  getCharacterComics,
  getComicCharacters,
  addUser,
  getUser,
  getUserFavComic,
  getUserFavCharacter,
  addFavComic,
  addFavCharacter,
  removeFavComic,
  removeFavCharacter
};
