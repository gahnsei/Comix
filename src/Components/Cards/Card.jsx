function Card(props) {
  const { id, name, image, handleEvent, isHovered, isClicked, type } = props;

  return (
    <>
      <div
        className={`card home-comic ${
          type === `characters` && `character-card`
        }`}
        onMouseEnter={() => handleEvent.onHover(id)}
        onMouseLeave={!isClicked && handleEvent.resetEvent}
        onClick={() => handleEvent.cardClick(id)}
      >
        <img src={image} alt={name} className="card-background" />
        {isHovered && (
          <div className="card-preview-info">
            <h2
              className="card-preview-label"
              onClick={() => handleEvent.nameClick(id)}
            >
              {name}
            </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
