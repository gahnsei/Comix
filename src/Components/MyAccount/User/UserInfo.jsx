import React from "react";

function UserInfo(props) {
  const { first_name, last_name, email } = props;
  return (
    <>
      <h1>Profile</h1>
      <div>
        <div>
          <span>First name</span>
          <span>{first_name}</span>
        </div>
        <div>
          <span>Last Name</span>
          <span>{last_name}</span>
        </div>
        <div>
          <span>Email</span>
          <span>{email}</span>
        </div>
        <div>
          <span>Password</span>
          <span></span>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
