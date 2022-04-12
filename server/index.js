require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const ctrl = require(`./controller`);
const app = express();

app.use(express.json());
app.use(cors());

// Endpoints

app.get(`/characters/search`, ctrl.searchCharacters);
app.get(`/comics/search`, ctrl.searchComics);
app.get(`/characters`, ctrl.getCharacter);
app.get(`/comics`, ctrl.getComics);
app.get(`/characters/comics`, ctrl.getCharacterComics);
app.get(`/signUp`, ctrl.addUser);
app.get(`/login`, ctrl.getUser);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () =>
  console.log(`Have You Boys Seen My Goyard Garments on ${SERVER_PORT}`)
);
