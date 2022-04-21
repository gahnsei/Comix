import React from "react";
import { useState } from "react";

function UserInfo(props) {
  const { first_name, last_name, email, password } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const hiddenPassword = `· `.repeat(password.length);

  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
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
      </div>
    </>
  );
}

export default UserInfo;
