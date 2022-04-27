import ContentInfo from "./ContentInfo";
import ContentRelations from "./ContentRelations";
import PageNotFound from "../General/PageNotFound";
import Loading from "../General/Loading";

import useDataBase from "../../utils/useDataBase";
import { useHandleUser } from "../../utils/UserContext";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

function Content() {
  const navigate = useNavigate();

  const { contentType, id } = useParams();
  const { dbRes, loading } = useDataBase(`/${contentType}?id=${id}`);
  const content = dbRes[0] || {};
  const { name, marvel_url, image, description } = content;

  const { userFavs, addFavs, removeFavs, userInfo } = useHandleUser();
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
  }, [contentType, id]);

  if (loading) return <Loading />;
  if (!name) return <PageNotFound />;

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
