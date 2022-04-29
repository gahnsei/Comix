import Card from "../Cards/Card";
import PlaceHolder from "../Cards/PlaceHolder";

import useDataBase from "../../utils/useDataBase";
import useCardManagement from "../../utils/useCardManagement";

import { useParams } from "react-router";

function ContentRelations(props) {
  const { contentType } = props;
  const { id } = useParams();
  const { dbRes: comics, loading } = useDataBase(
    `/${contentType}/relations?id=${id}`
  );
  const relationType = contentType === `comics` ? `characters` : `comics`;
  const { mouseEventHandler, mouseEvent } = useCardManagement(relationType);

  const placeHolderArr = [1, 2, 3];

  return (
    <section className="character-comics">
      <h3>{relationType.toUpperCase()}</h3>
      <div className="flex-scroll">
        {loading
          ? placeHolderArr.map(() => <PlaceHolder />)
          : comics.map((ele) => (
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
