require(`dotenv`).config();
const express = require(`express`);
const path = require(`path`);
const cors = require(`cors`);
const ctrl = require(`./controller`);
const app = express();

// Midleware

app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, `../build`)));

// Endpoints

app.get(`/api`, ctrl.welcome);

app.get(`/api/characters`, ctrl.getCharacter);
app.get(`/api/characters/relations`, ctrl.getCharacterComics);
app.get(`/api/characters/search`, ctrl.searchCharacters);
app.get(`/api/comics`, ctrl.getComics);
app.get(`/api/comics/relations`, ctrl.getComicCharacters);
app.get(`/api/comics/search`, ctrl.searchComics);
app.get(`/api/user/characters`, ctrl.getUserFavCharacter);
app.get(`/api/user/comics`, ctrl.getUserFavComic);
app.get(`/api/login`, ctrl.getUser);
app.get(`/api/user/saved`, ctrl.getSavedUSer);

app.post(`/api/user/characters`, ctrl.addFavCharacter);
app.post(`/api/user/comics`, ctrl.addFavComic);
app.post(`/api/signUp`, ctrl.addUser);

app.delete(`/api/user`, ctrl.removeUser);
app.delete(`/api/user/characters`, ctrl.removeFavCharacter);
app.delete(`/api/user/comics`, ctrl.removeFavComic);

app.get(`/*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../build`, `index.html`));
});

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`Have You Boys Seen My Goyard Garments on ${PORT}`)
);
