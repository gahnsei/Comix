import { useState, useEffect } from "react";
import useDataBase from "./useDataBase";

function useSignUp() {
  const [newUserForm, setNewUserForm] = useState({
    "First Name": ``,
    "Last Name": ``,
    email: ``,
    password: ``,
    "Verify Password": ``
  });

  const [formError, setFormError] = useState({
    "First Name": ``,
    "Last Name": ``,
    email: ``,
    password: ``,
    "Verify Password": ``
  });

  const { addUser, dbErr } = useDataBase(``);

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormError({
      "First Name": ``,
      "Last Name": ``,
      email: ``,
      password: ``,
      "Verify Password": ``,
      server: ``
    });

    setNewUserForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    let firstNameError = ``;
    let lastNameError = ``;
    let emailError = ``;
    let passwordError = ``;
    let verifyPassError = ``;

    if (!newUserForm[`First Name`])
      firstNameError = `First name can't be empty!`;
    if (!newUserForm[`Last Name`]) lastNameError = `Last name can't be empty!`;
    if (!newUserForm.email) emailError = `Email can't be empty!`;
    if (!newUserForm.password) {
      passwordError = `Password can't be empty!`;
    } else if (newUserForm.password.length < 8) {
      passwordError = `Password should be at least 8 characters!`;
    }
    if (newUserForm.password !== newUserForm["Verify Password"]) {
      verifyPassError = `Passwords Don't Match`;
    }

    if (
      emailError ||
      passwordError ||
      firstNameError ||
      lastNameError ||
      verifyPassError
    ) {
      setFormError({
        "First Name": firstNameError,
        "Last Name": lastNameError,
        email: emailError,
        password: passwordError,
        "Verify Password": verifyPassError
      });
    } else {
      addUser(newUserForm);
    }
  };

  useEffect(() => {
    if (newUserForm[`First Name`]) {
      setFormError({
        server: dbErr.includes(`Email Already Exists`)
          ? `Email Already Exists`
          : dbErr
      });
    }
  }, [dbErr]);

  return { newUserForm, handleFormChange, formError, submitForm };
}

export default useSignUp;
