import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useHandleUser } from "./UserContext";

const BASE_URL = `http://localhost:4444`;

const useDataBase = (URL) => {
  const [dbRes, setDbRes] = useState([]);
  const [dbErr, setDbErr] = useState(``);
  const navigate = useNavigate();
  const handleUser = useHandleUser();

  useEffect(() => {
    const func = async () => {
      const res = await axios.get(BASE_URL + URL);
      setDbRes(res.data);
    };

    func();
  }, [URL]);

  const loginUser = (body) => {
    const { email, password } = body;
    axios
      .get(`${BASE_URL}/login?email=${email}&password=${password}`)
      .then((res) => {
        handleUser.loginUser({ ...res.data[0], password });
        const userId = res.data[0].id;
        getFavCharacters(userId);
        getFavComics(userId);
        navigate(`/myaccount`);
      })
      .catch((err) => setDbErr(err.response.data));
  };

  const loginSavedUser = (userId) => {
    axios.get(BASE_URL + `/user/saved`).then((res) => {
      handleUser.loginUser({ ...res.data[0] });
      const userId = res.data[0].id;
      getFavCharacters(userId);
      getFavComics(userId);
    });
  };

  const addUser = (body) => {
    axios
      .post(`${BASE_URL}/signUp`, body)
      .then((res) => {
        handleUser.loginUser(res.data[0]);
        navigate(`/myaccount`);
      })
      .catch((err) => setDbErr(err.response.data));
  };

  const addFavComic = (userId, comicId) => {
    axios
      .post(BASE_URL + `/user/comics`, { userId, comicId })
      .catch((err) => console.log(err));
  };

  const addFavCharacter = (userId, charId) => {
    axios
      .post(BASE_URL + `/user/characters`, { userId, charId })
      .catch((err) => console.log(err));
  };

  const getFavCharacters = (userId) => {
    axios
      .get(BASE_URL + `/user/characters?userId=${userId}`)
      .then((res) => {
        handleUser.getFavs(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getFavComics = (userId) => {
    axios
      .get(BASE_URL + `/user/comics?userId=${userId}`)
      .then((res) => handleUser.getFavs(res.data))
      .catch((err) => console.log(err));
  };

  const removeFavCharacters = (userId, charId) => {
    axios
      .delete(BASE_URL + `/user/characters?userId=${userId}&charId=${charId}`)
      .catch((err) => console.log(err));
  };

  const removeFavComics = (userId, comicId) => {
    axios
      .delete(BASE_URL + `/user/comics?userId=${userId}&comicId=${comicId}`)
      .catch((err) => console.log(err));
  };

  return {
    dbRes,
    loginUser,
    addUser,
    dbErr,
    addFavComic,
    addFavCharacter,
    removeFavCharacters,
    removeFavComics
  };
};

export default useDataBase;
