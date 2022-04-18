import useDataBase from "../../utils/useDataBase";
import { useParams } from "react-router";
import Card from "../Cards/Card";
import useCardManagement from "../../utils/useCardManagement";

function CharacterComics(props) {
  const { type } = props;
  const { id } = useParams();
  const { dbRes: comics } = useDataBase(`/${type}/relations?id=${id}`);
  const relationType = type === `comics` ? `characters` : `comics`;
  const { mouseEventHandler, mouseEvent } = useCardManagement(relationType);

  return (
    <section className="character-comics">
      <h3>{relationType.toUpperCase()}</h3>
      <div className="flex-scroll">
        {comics.map((ele) => (
          <Card
            key={ele.id}
            {...ele}
            handleEvent={mouseEventHandler}
            isHovered={mouseEvent.hover && mouseEvent.id === ele.id}
            isClicked={mouseEvent.click && mouseEvent.id === ele.id}
            type={relationType}
          />
        ))}
      </div>
    </section>
  );
}

export default CharacterComics;
