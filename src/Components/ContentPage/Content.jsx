import { useParams } from "react-router";
import ContentInfo from "./ContentInfo";
import useDataBase from "../../utils/useDataBase";
import { useHandleUser } from "../../utils/UserContext";
import ContentRelations from "./ContentRelations";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Content() {
  const { contentType, id } = useParams();
  const { dbRes } = useDataBase(`/${contentType}?id=${id}`);
  const { userFavs, addFavs, removeFavs, userInfo } = useHandleUser();
  const navigate = useNavigate();
  const character = dbRes[0] || {};
  const { name, marvel_url, image, description } = character;
  const isFav = userFavs.includes(name);

  const handleFavButton = () => {
    if (userInfo.id) {
      isFav
        ? removeFavs(name, id, contentType)
        : addFavs(name, id, contentType);
    } else {
      navigate(`/myaccount/login`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="content-page">
      <div className="green">
        <img src={image} alt={name} className="character-image" />
      </div>
      <div className="flex-scroll-y">
        <ContentInfo
          name={name}
          description={description}
          marvelUrl={marvel_url}
          isFav={isFav}
          handleFavButton={handleFavButton}
          contentType={contentType}
        />
        <ContentRelations contentType={contentType} />
      </div>
    </div>
  );
}

export default Content;
