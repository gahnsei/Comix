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
        value={newUserForm[`First Name`]}
        name="First Name"
        id="firstName"
        handleChange={handleFormChange}
        error={formError[`First Name`]}
      />
      <InputBox
        type="text"
        value={newUserForm["Last Name"]}
        name="Last Name"
        id="lastName"
        handleChange={handleFormChange}
        error={formError["Last Name"]}
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
      <InputBox
        type="password"
        value={newUserForm[`Verify Password`]}
        name="Verify Password"
        id="verifyPassword"
        handleChange={handleFormChange}
        error={formError[`Verify Password`]}
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
