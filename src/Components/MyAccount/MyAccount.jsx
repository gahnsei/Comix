import Auth from "./Auth/Auth";
import User from "./User/User";
import { Routes, Route } from "react-router";

function MyAccount() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:authenticate" element={<Auth />} />
      </Routes>
    </section>
  );
}

export default MyAccount;
