import useDataBase from "./useDataBase";
import { useState } from "react";

const useUserData = () => {
  const [user, setUser] = useState({});
  const [userFavs, setUserFavs] = useState([]);
  const { addFavCharacter, addFavComic, removeFavCharacters, removeFavComics } =
    useDataBase();

  const loginUser = (userInfo) => {
    setUser(userInfo);
  };

  const getFavs = (favArr) => {
    const favs = favArr.map((ele) => ele.name);
    setUserFavs((prevFavs) => [...prevFavs, ...favs]);
  };

  const addFavs = (name, id, type) => {
    if (type === `comics`) {
      setUserFavs((prevFavs) => [...prevFavs, name]);
      addFavComic(user.id, id);
    } else if (type === `characters`) {
      setUserFavs((prevFavs) => [...prevFavs, name]);
      addFavCharacter(user.id, id);
    }
  };

  const removeFavs = (name, id, type) => {
    if (type === `comics`) {
      setUserFavs((prevFavs) => prevFavs.filter((ele) => ele !== name));
      removeFavComics(user.id, id);
    } else if (type === `characters`) {
      setUserFavs((prevFavs) => prevFavs.filter((ele) => ele !== name));
      removeFavCharacters(user.id, id);
    }
  };

  const handleUser = {
    userInfo: { ...user },
    getFavs,
    userFavs,
    loginUser,
    addFavs,
    removeFavs
  };

  return handleUser;
};

export default useUserData;
