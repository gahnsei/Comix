function Card(props) {
  const { id, name, image, handleEvent, isHovered, contentType } = props;

  return (
    <div
      className={`card
      ${contentType === `characters` && `character-card`}`}
      onMouseEnter={() => handleEvent.onHover(id)}
      onMouseLeave={handleEvent.resetEvent}
      onClick={() => handleEvent.cardClick(id)}
    >
      <img loading="lazy" src={image} alt={name} className="card-background" />
      {isHovered && (
        <div className="card-preview-info">
          <h2 className="card-preview-label">{name}</h2>
        </div>
      )}
    </div>
  );
}

export default Card;
