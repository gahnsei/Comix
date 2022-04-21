import useDataBase from "../../../utils/useDataBase";
import useCardManagement from "../../../utils/useCardManagement";
import Card from "../../Cards/Card";

function UserFavorites(props) {
  const { contentType, userId } = props;
  const { dbRes: data } = useDataBase(`/user/${contentType}?userId=${userId}`);
  const { mouseEventHandler, mouseEvent } = useCardManagement(contentType);

  return (
    <>
      <h1 className="user-content-label">
        FAVORITE {contentType.toUpperCase()}
      </h1>
      <div className="user-fav-container">
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
    </>
  );
}

export default UserFavorites;
