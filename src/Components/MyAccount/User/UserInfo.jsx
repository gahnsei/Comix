import React from "react";
import { useState } from "react";

function UserInfo(props) {
  const { first_name, last_name, email, password, logoutUser, deleteUser } =
    props;
  const [hidePassword, setHidePassword] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const hiddenPassword = `· `.repeat(password.length);

  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
  };

  const openPopUp = () => {
    setPopUp(true);
  };

  const closePopUp = (event) => {
    const background =
      event.target.classList.value.includes(`popUp-background`);
    const cancelButton = event.target.classList.value.includes(`cancel-delete`);
    if (background || cancelButton) {
      setPopUp(false);
    }
  };

  return (
    <>
      <h1 className="user-content-label">PROFILE</h1>
      <div className="user-info-container">
        <div className="user-name-div">
          <div className="user-info-div">
            <span className="info-div-label">First name</span>
            <span className="info-div-data">{first_name}</span>
          </div>
          <div className="user-info-div">
            <span className="info-div-label">Last Name</span>
            <span className="info-div-data">{last_name}</span>
          </div>
        </div>
        <div className="user-info-div">
          <span className="info-div-label">Email</span>
          <span className="info-div-data">{email}</span>
        </div>
        <div className="user-info-div">
          <span className="info-div-label">
            Password
            <i className="fa-solid fa-eye" onClick={togglePassword}></i>
          </span>
          <span className="info-div-data">
            {hidePassword ? hiddenPassword : password}
          </span>
        </div>
        <span className="remove-account" onClick={logoutUser}>
          Log Out
        </span>
        <span className="remove-account delete-account" onClick={openPopUp}>
          Delete Account
        </span>
        {popUp && (
          <div
            className="popUp-background"
            onClick={(event) => closePopUp(event)}
          >
            <div className="popUp">
              <h2>
                Your Acoount Will Be Deleted Permenantly. Are You Sure You Want
                To Continue?
              </h2>
              <div>
                <span className="delete-account" onClick={deleteUser}>
                  Delete
                </span>
                <span
                  className="cancel-delete"
                  onClick={(event) => closePopUp(event)}
                >
                  Cancel
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserInfo;
