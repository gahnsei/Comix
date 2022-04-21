import InputBox from "../InputBox";
import useLogin from "../../../utils/useLogin";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginForm, handleFormChange, formError, submitForm } = useLogin();

  const navigate = useNavigate();

  return (
    <form className="auth-form">
      <h1 className="auth-header">Sign In</h1>
      <InputBox
        type="text"
        name="email"
        value={loginForm.email}
        handleChange={handleFormChange}
        error={formError.email}
      />
      <InputBox
        type="password"
        name="password"
        value={loginForm.password}
        handleChange={handleFormChange}
        error={formError.password}
      />
      {formError.server && (
        <span className="auth-server-error">{formError.server}</span>
      )}
      <span className="auth-redirect">
        Don't have an account?
        <span onClick={() => navigate("/myaccount/signup")}>
          Create An Account
        </span>
      </span>
      <button className="auth-button" onClick={submitForm}>
        Sign In
      </button>
    </form>
  );
};

export default Login;
