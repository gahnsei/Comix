import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const useDataBase = (URL) => {
  const [dbRes, setDbRes] = useState([]);
  const [dbErr, setDbErr] = useState(``);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const res = await axios.get(`http://localhost:4444` + URL);
      setDbRes(res.data);
    };

    func();
  }, [URL]);

  const loginUser = (body) => {
    const { email, password } = body;
    axios
      .get(`http://localhost:4444/login?email=${email}&password=${password}`)
      .then((res) => navigate(`/`))
      .catch((err) => setDbErr(err.message));
  };

  const addUser = (body) => {
    axios
      .post(`http://localhost:4444/signUp`, body)
      .then((res) => console.log(res.data));
  };

  return { dbRes, loginUser, addUser, dbErr };
};

export default useDataBase;
