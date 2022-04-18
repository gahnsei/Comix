function CharacterInfo(props) {
  const { name, description, isFav, handleFavButton, type, marvelUrl } = props;
  return (
    <section className="section character-info">
      <h1 className="character-name">{name}</h1>
      <button
        className={`character-button ${isFav && `favorite`}`}
        onClick={handleFavButton}
      >
        Favorite
      </button>
      {type === `comics` ? (
        <a
          href={`https://www.amazon.com/s?k=${name}`}
          className="character-button amazon-button"
        >
          Search On Amazon
        </a>
      ) : (
        <a href={marvelUrl} className="character-button amazon-button">
          Discover More
        </a>
      )}
      <p className="character-description">{description}</p>
    </section>
  );
}

export default CharacterInfo;
