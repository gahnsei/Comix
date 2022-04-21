import Card from "../Cards/Card";
import useDataBase from "../../utils/useDataBase";
import useCardManagement from "../../utils/useCardManagement";

const Recomendation = (props) => {
  const { url, label, contentType } = props;
  const { mouseEventHandler, mouseEvent } = useCardManagement(contentType);
  const { dbRes: data } = useDataBase(url);

  return (
    <section className="section">
      <h2 className="h2 section-label">{label}</h2>
      <div className="flex-scroll">
        {data.map((ele) => (
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
