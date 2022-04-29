function ContentInfo(props) {
  const { name, description, isFav, handleFavButton, contentType, marvelUrl } =
    props;

  return (
    <section className="section character-info">
      <h1 className="character-name">{name}</h1>
      <div className="button-container">
        <button
          className={`character-button ${isFav && `favorite`}`}
          onClick={handleFavButton}
        >
          Favorite
        </button>
        {contentType === `comics` ? (
          <a
            href={`https://www.amazon.com/s?k=marvel+${name}`}
            className="character-button amazon-button"
            target="_blank"
            rel="noreferrer"
          >
            Search On Amazon
          </a>
        ) : (
          <a
            href={marvelUrl}
            className="character-button amazon-button"
            target="_blank"
            rel="noreferrer"
          >
            Discover More
          </a>
        )}
      </div>
      <p className="character-description">{description}</p>
    </section>
  );
}

export default ContentInfo;
