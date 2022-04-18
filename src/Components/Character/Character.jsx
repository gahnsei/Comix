import { useParams } from "react-router";
import CharacterInfo from "./CharacterInfo";
import useDataBase from "../../utils/useDataBase";
import { useHandleUser } from "../../utils/UserContext";
import CharacterComics from "./CharacterComics";
import { useNavigate } from "react-router";

function Character() {
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
      navigate(`/myaccount`);
    }
  };

  return (
    <div className="content-page">
      <div className="green">
        <img src={image} alt={name} className="character-image" />
      </div>
      <div className="flex-scroll-y">
        <CharacterInfo
          name={name}
          description={description}
          marvelUrl={marvel_url}
          isFav={isFav}
          handleFavButton={handleFavButton}
          type={contentType}
        />
        <CharacterComics type={contentType} />
      </div>
    </div>
  );
}

export default Character;
