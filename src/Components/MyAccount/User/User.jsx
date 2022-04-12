import { useEffect } from "react";
import { useNavigate } from "react-router";

function User() {
  const navigate = useNavigate();
  const userId = ``;

  useEffect(() => {
    if (!userId) {
      navigate(`/myaccount/login`);
    }
  }, []);

  return <div>User</div>;
}

export default User;
