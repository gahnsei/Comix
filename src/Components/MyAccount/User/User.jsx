import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useHandleUser } from "../../../utils/UserContext";
import UserInfo from "./UserInfo";
import { Routes, Route } from "react-router";
import UserFavorites from "./UserFavorites";

function User() {
  const navigate = useNavigate();
  const { userInfo } = useHandleUser();
  const { user_id } = userInfo;

  useEffect(() => {
    if (!user_id) {
      navigate(`/myaccount/login`);
    }
  }, []);

  return (
    <section>
      <UserInfo {...userInfo} />
      <UserFavorites type="characters" userId={userInfo.id} />
    </section>
  );
}

export default User;
