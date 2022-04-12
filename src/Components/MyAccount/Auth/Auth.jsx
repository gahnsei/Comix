import Login from "./Login";
import SignUp from "./SignUp";
import { useParams } from "react-router";

function Auth() {
  const { authenticate } = useParams();
  return (
    <section className=" section my--account-auth">
      {authenticate === `login` ? (
        <Login />
      ) : authenticate === `signup` ? (
        <SignUp />
      ) : (
        <h1>404</h1>
      )}
    </section>
  );
}

export default Auth;
