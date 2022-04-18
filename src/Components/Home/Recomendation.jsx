import Card from "../Cards/Card";
import useDataBase from "../../utils/useDataBase";
import useCardManagement from "../../utils/useCardManagement";

const Recomendation = (props) => {
  const { url, label, type } = props;
  const { mouseEventHandler, mouseEvent } = useCardManagement(type);
  const { dbRes: data } = useDataBase(url);

  return (
    <section className="section">
      <h2 className="h2 section-label">{label}</h2>
      <div className="flex-scroll">
        {data.map((ele) => (
          <Card
            key={ele.id}
            {...ele}
            handleEvent={mouseEventHandler}
            isHovered={mouseEvent.hover && mouseEvent.id === ele.id}
            isClicked={mouseEvent.click && mouseEvent.id === ele.id}
            type={type}
          />
        ))}
      </div>
    </section>
  );
};

export default Recomendation;
