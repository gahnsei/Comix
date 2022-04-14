function CharacterInfo(props) {
  const { name, description, isFav, handleFavButton, type } = props;
  return (
    <section className="section character-info">
      <h1>{name}</h1>
      <button
        className={`character-button ${isFav && `favorite`}`}
        onClick={handleFavButton}
      >
        Favorite
      </button>
      {type === `comics` && (
        <a
          href={`https://www.amazon.com/s?k=${name}`}
          className="character-button amazon-button"
        >
          Search On Amazon
        </a>
      )}
      <p className="character-description">{description}</p>
    </section>
  );
}

export default CharacterInfo;
