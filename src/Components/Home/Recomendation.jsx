import Card from "../Cards/Card";
import PlaceHolder from "../Cards/PlaceHolder";
import useDataBase from "../../utils/useDataBase";
import useCardManagement from "../../utils/useCardManagement";

const Recomendation = (props) => {
  const { url, label, contentType } = props;
  const { mouseEventHandler, mouseEvent } = useCardManagement(contentType);
  const { dbRes: data, loading } = useDataBase(url);

  const placeHolderArr = [1, 2, 3, 4, 5];

  return (
    <section className="section">
      <h2 className="h2 section-label">{label}</h2>
      <div className="flex-scroll">
        {loading
          ? placeHolderArr.map(() => <PlaceHolder />)
          : data.map((ele) => (
              <Card
                key={ele.marvel_id}
                {...ele}
                handleEvent={mouseEventHandler}
                isHovered={mouseEvent.hover && mouseEvent.id === ele.id}
                isClicked={mouseEvent.click && mouseEvent.id === ele.id}
                contentType={contentType}
              />
            ))}
      </div>
    </section>
  );
};

export default Recomendation;
