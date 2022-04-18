import { useState, useEffect } from "react";
import useDataBase from "./useDataBase";

function useSignUp() {
  const [newUserForm, setNewUserForm] = useState({
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``
  });

  const [formError, setFormError] = useState({
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``
  });

  const { addUser, dbErr } = useDataBase(``);

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormError({
      firstName: ``,
      lastName: ``,
      email: ``,
      password: ``,
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

    if (!newUserForm.firstName) firstNameError = `First name can't be empty!`;
    if (!newUserForm.lastName) lastNameError = `Last name can't be empty!`;
    if (!newUserForm.email) emailError = `Email can't be empty!`;
    if (!newUserForm.password) {
      passwordError = `Password can't be empty!`;
    } else if (newUserForm.password.length < 8) {
      passwordError = `Password should be at least 8 characters!`;
    }

    if (emailError || passwordError || firstNameError || lastNameError) {
      setFormError({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError
      });
    } else {
      addUser(newUserForm);
    }
  };

  useEffect(() => {
    if (newUserForm.firstName) {
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
