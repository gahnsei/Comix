import CharacterComics from "./CharacterComics";

function CharacterInfo(props) {
  const { name, description } = props;
  return (
    <section className="section character-info">
      <h1>{name}</h1>
      <button className="favorite-button character-button">Favorite</button>
      <p className="character-description">{description}</p>
      <CharacterComics />
    </section>
  );
}

export default CharacterInfo;
