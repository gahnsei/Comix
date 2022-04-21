import useDataBase from "../../utils/useDataBase";
import { useParams } from "react-router";
import Card from "../Cards/Card";
import useCardManagement from "../../utils/useCardManagement";

function ContentRelations(props) {
  const { contentType } = props;
  const { id } = useParams();
  const { dbRes: comics } = useDataBase(`/${contentType}/relations?id=${id}`);
  const relationType = contentType === `comics` ? `characters` : `comics`;
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
            contentType={relationType}
          />
        ))}
      </div>
    </section>
  );
}

export default ContentRelations;
