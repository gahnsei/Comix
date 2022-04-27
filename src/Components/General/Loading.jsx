import React from "react";
import logo from "../../Loading.png";

function Loading() {
  return (
    <div className="page-not-found">
      <img src={logo} alt="loading" className="logo loading" />
    </div>
  );
}

export default Loading;
