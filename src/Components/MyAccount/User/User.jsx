import Loading from "../../General/Loading";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useHandleUser } from "../../../utils/UserContext";
import UserInfo from "./UserInfo";
import UserNav from "./UserNav";
import UserFavorites from "./UserFavorites";

function User() {
  const [infoType, setInfoType] = useState(`profile`);
  const navigate = useNavigate();
  const { userInfo, logoutUser, deleteUser } = useHandleUser();
  const { user_id } = userInfo;

  const profileActive = infoType === "profile";
  const favComicsActive = infoType === "favComics";
  const favCharactersActive = infoType === "favCharacters";

  useEffect(() => {
    if (!user_id) {
      navigate(`/myaccount/login`);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!user_id) return <Loading />;

  return (
    <section className="section user-page">
      <UserNav
        profileActive={profileActive}
        favCharactersActive={favCharactersActive}
        favComicsActive={favComicsActive}
        setInfoType={setInfoType}
      />
      <div className="user-content">
        {profileActive ? (
          <UserInfo
            {...userInfo}
            logoutUser={logoutUser}
            deleteUser={deleteUser}
          />
        ) : favComicsActive ? (
          <UserFavorites contentType="comics" userId={userInfo.id} />
        ) : (
          <UserFavorites contentType="characters" userId={userInfo.id} />
        )}
      </div>
    </section>
  );
}

export default User;
