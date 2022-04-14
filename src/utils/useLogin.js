import { useState, useEffect } from "react";
import useDataBase from "./useDataBase";

function useLogin() {
  const [loginForm, setLoginForm] = useState({
    email: ``,
    password: ``
  });

  const [formError, setFormError] = useState({
    email: ``,
    password: ``,
    server: ``
  });

  const { loginUser, dbErr } = useDataBase(``);

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormError({
      email: ``,
      password: ``,
      server: ``
    });

    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    let emailError = ``;
    let passwordError = ``;

    if (!loginForm.email) emailError = `Email can't be empty!`;
    if (!loginForm.password) {
      passwordError = `Password can't be empty!`;
    }

    if (emailError || passwordError) {
      setFormError({
        email: emailError,
        password: passwordError
      });
      return;
    }

    loginUser(loginForm);
  };

  useEffect(() => {
    if (loginForm.email) {
      setFormError({
        server: dbErr
      });
    }
  }, [dbErr]);

  return { loginForm, handleFormChange, formError, submitForm };
}

export default useLogin;
