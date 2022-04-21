require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const ctrl = require(`./controller`);
const app = express();

app.use(express.json());
app.use(cors());

// Endpoints

app.get(`/`, ctrl.welcome);

app.get(`/characters`, ctrl.getCharacter);
app.get(`/characters/relations`, ctrl.getCharacterComics);
app.get(`/characters/search`, ctrl.searchCharacters);
app.get(`/comics`, ctrl.getComics);
app.get(`/comics/relations`, ctrl.getComicCharacters);
app.get(`/comics/search`, ctrl.searchComics);
app.get(`/user/characters`, ctrl.getUserFavCharacter);
app.get(`/user/comics`, ctrl.getUserFavComic);
app.get(`/login`, ctrl.getUser);

app.post(`/user/characters`, ctrl.addFavCharacter);
app.post(`/user/comics`, ctrl.addFavComic);
app.post(`/signUp`, ctrl.addUser);

app.delete(`/user/characters`, ctrl.removeFavCharacter);
app.delete(`/user/comics`, ctrl.removeFavComic);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () =>
  console.log(`Have You Boys Seen My Goyard Garments on ${SERVER_PORT}`)
);
