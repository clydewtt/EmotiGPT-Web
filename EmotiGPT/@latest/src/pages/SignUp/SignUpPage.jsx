import React from "react";
import SignUpStyles from "./SignUp.module.css";
import googleIcon from "../../assets/google-icon.png";

function SignUpPage() {
  return (
    <>
      <div className={SignUpStyles.pageContainer}>
        <h1 className={SignUpStyles.pageTitle}>EmotiGPT</h1>
      </div>

      <div className={SignUpStyles.loginCardContainer}>
        <h1>Create Account</h1>
        <label htmlFor="username-entry">Email</label>
        <input
          type="text"
          placeholder="Type your email"
          className={SignUpStyles.loginInput}
          id="username-entry"
        />
        <label htmlFor="password-entry">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className={SignUpStyles.loginInput}
          id="password-entry"
        />
        <button className={SignUpStyles.loginButton}>Create Account</button>
        <div className={SignUpStyles.orText}>Or</div>
        <button className={SignUpStyles.googleButton}>
          <img
            src={googleIcon}
            alt="Google"
            className={SignUpStyles.googleIcon}
          />
          Continue with Google
        </button>

        <a href="/login" className={SignUpStyles.loginLink}>
          Already have an account? Log in
        </a>
      </div>
    </>
  );
}

export default SignUpPage;
