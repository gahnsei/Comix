import useDataBase from "../../utils/useDataBase";
import { useParams } from "react-router";
import Card from "../Cards/Card";
import useCardManagement from "../../utils/useCardManagement";

function CharacterComics(props) {
  const { id } = useParams();
  const { dbRes: comics } = useDataBase(`/characters/comics?id=${id}`);
  const { mouseEventHandler, mouseEvent } = useCardManagement(`comics`);

  console.log(comics);
  return (
    <div className="character-comics">
      <h3>Comics</h3>
      <div className="flex-scroll">
        {comics.map((ele) => (
          <Card
            key={ele.id}
            {...ele}
            handleEvent={mouseEventHandler}
            isHovered={mouseEvent.hover && mouseEvent.id === ele.id}
            isClicked={mouseEvent.click && mouseEvent.id === ele.id}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterComics;
