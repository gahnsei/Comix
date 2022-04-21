import Auth from "./Auth/Auth";
import User from "./User/User";
import { Routes, Route } from "react-router";
import { useEffect } from "react";

function MyAccount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:authenticate" element={<Auth />} />
      </Routes>
    </>
  );
}

export default MyAccount;
