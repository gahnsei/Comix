import Login from "./Login";
import SignUp from "./SignUp";
import { useParams } from "react-router";
import { useEffect } from "react";
import PageNotFound from "../../General/PageNotFound";
import { useHandleUser } from "../../../utils/UserContext";
import { useNavigate } from "react-router";

function Auth() {
  const { authenticate } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useHandleUser();
  const { user_id } = userInfo;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user_id) navigate(`/myaccount`);
  });

  if (authenticate !== `login` && authenticate !== `signup`)
    return <PageNotFound />;
  if (user_id) return <></>;
  return (
    <section className=" section my--account-auth">
      {authenticate === `login` ? <Login /> : <SignUp />}
    </section>
  );
}

export default Auth;
