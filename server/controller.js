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

const addUser = (req, res) => {
  let { firstName, lastName, email, password } = req.query;
  const userId = nanoid();
  const salt = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(password, salt);

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
};

const getUser = async (req, res) => {
  const { email, password } = req.query;

  const dbRes = await sequelize.query(
    `SELECT * FROM Users
    WHERE lower(email) = '${email}';`
  );

  const user = dbRes[0];

  if (user.length === 0) {
    return res.status(404).send(`User Not Found`);
  } else {
    let userPassword = user[0].password;
    const compare = bcrypt.compareSync(password, userPassword);
    return compare
      ? res.status(200).send(user)
      : res.status(400).send(`Incorrect Password`);
  }
};

module.exports = {
  searchCharacters,
  searchComics,
  getComics,
  getCharacter,
  getCharacterComics,
  addUser,
  getUser
};
