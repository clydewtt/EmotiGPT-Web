import React from "react";
import LoginStyles from "./LoginPage.module.css";

import googleIcon from "../../assets/google-icon.png";

function LoginPage() {
  return (
    <>
      <div className={LoginStyles.pageContainer}>
        <h1 className={LoginStyles.pageTitle}>EmotiGPT</h1>
      </div>

      <div className={LoginStyles.loginCardContainer}>
        <h1>Login</h1>
        <label htmlFor="username-entry">Username</label>
        <input
          type="text"
          placeholder="Type your username"
          className={LoginStyles.loginInput}
          id="username-entry"
        />
        <label htmlFor="password-entry">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className={LoginStyles.loginInput}
          id="password-entry"
        />
        <button className={LoginStyles.loginButton}>Login</button>
        <div className={LoginStyles.orText}>Or</div>
        <button className={LoginStyles.googleButton}>
          <img
            src={googleIcon}
            alt="Google"
            className={LoginStyles.googleIcon}
          />
          Continue with Google
        </button>

        <a href="/signup" className={LoginStyles.signupLink}>
          New Here? Sign up
        </a>
      </div>
    </>
  );
}

export default LoginPage;
