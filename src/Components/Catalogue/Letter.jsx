import Card from "../Cards/Card";
import useCardManagement from "../../utils/useCardManagement";

function Letter(props) {
  const { filteredData, type, changeLetter, openLetter } = props;
  const { mouseEventHandler, mouseEvent } = useCardManagement(type);

  const letter = filteredData[0] ? filteredData[0].name[0] : ``;

  const isOpened = openLetter === letter;

  return (
    <div
      className={`catalogue-letter ${!isOpened && `hover`}`}
      onClick={() => changeLetter(letter)}
    >
      <div className="letter-label">
        <span>{letter}</span>
        {isOpened ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
      </div>
      {isOpened && (
        <div className="catalogue-cards flex-scroll">
          {filteredData.map((ele) => (
            <Card
              type={type}
              key={ele.id}
              {...ele}
              handleEvent={mouseEventHandler}
              isHovered={mouseEvent.hover && mouseEvent.id === ele.id}
              isClicked={mouseEvent.click && mouseEvent.id === ele.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Letter;
