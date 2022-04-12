import InputBox from "../InputBox";
import useSignUp from "../../../utils/useSignUp";
import { useNavigate } from "react-router";

function SignUp() {
  const { newUserForm, handleFormChange, formError, submitForm } = useSignUp();

  const navigate = useNavigate();

  return (
    <form className="auth-form">
      <h1 className="auth-header">Create An Account</h1>
      <InputBox
        type="text"
        value={newUserForm.firstName}
        name="firstName"
        id="firstName"
        handleChange={handleFormChange}
        error={formError.firstName}
      />
      <InputBox
        type="text"
        value={newUserForm.lastName}
        name="lastName"
        id="lastName"
        handleChange={handleFormChange}
        error={formError.lastName}
      />
      <InputBox
        type="text"
        value={newUserForm.email}
        name="email"
        id="email"
        handleChange={handleFormChange}
        error={formError.email}
      />
      <InputBox
        type="password"
        value={newUserForm.password}
        name="password"
        id="password"
        handleChange={handleFormChange}
        error={formError.password}
      />
      {formError.server && (
        <span className="auth-server-error">{formError.server}</span>
      )}
      <span className="auth-redirect">
        Already have an account?
        <span onClick={() => navigate(`/myaccount/login`)}>Sign In</span>
      </span>
      <button className="auth-button" onClick={submitForm}>
        Create Account
      </button>
    </form>
  );
}

export default SignUp;
