import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useHandleUser } from "./UserContext";

const BASE_URL = `http://localhost:4444`;

const useDataBase = (URL) => {
  const [dbRes, setDbRes] = useState([]);
  const [dbErr, setDbErr] = useState(``);
  const [loading, setLoading] = useState(false);
  const handleUser = useHandleUser();
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + URL);
        setDbRes(res.data);
      } catch (err) {
        setDbErr(err);
      } finally {
        setLoading(false);
      }
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
        document.cookie = `qazxswedc=${res.data[0].user_id}*${password}`;
        getFavCharacters(userId);
        getFavComics(userId);
        navigate(`/myaccount`);
      })
      .catch((err) => setDbErr(err.response.data));
  };

  const addUser = (body) => {
    axios
      .post(`${BASE_URL}/signUp`, body)
      .then((res) => {
        handleUser.loginUser({ ...res.data[0], password: body.password });
        document.cookie = `qazxswedc=${res.data[0].user_id}*${body.password}`;
        navigate(`/myaccount`);
      })
      .catch((err) => setDbErr(err.response.data));
  };

  const removeUser = (userId) => {
    axios
      .delete(BASE_URL + `/user?userId=${userId}`)
      .catch((err) => console.log(err));
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
    dbErr,
    loading,
    loginUser,
    addUser,
    addFavComic,
    addFavCharacter,
    removeFavCharacters,
    removeFavComics,
    removeUser,
    getFavCharacters,
    getFavComics
  };
};

export default useDataBase;
