import { useState } from "react";
import TextField from "../../components/Input/textInput";
import PasswordField from "../../components/Input/passwordInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import styles from "./Login.module.css";
import logo from "./Assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className={styles.signup}>
      <div className={styles.signupBoundingbox}>
        <div className={styles.signupBoundingboxText}>
          <div className={styles.nameAndLogo}>
            <img src={logo} />
            <h3>Retain</h3>
          </div>
          <div className={styles.signupBoundingboxTextInner}>
            <h1>Login</h1>
            <h6>Enter your credential to continue</h6>
          </div>
          <div className={styles.signupField}>
            <TextField
              placeholder={
                "Username"
              } /*value={username} onChange={(e) => setUsername(e.target.value)}*/
            />
            <TextField
              placeholder={
                "Email"
              } /*value={email} onChange={(e) => setEmail(e.target.value)}*/
            />
            <PasswordField /*value={password} onChange={(e) => setPassword(e.target.value)}*/
            />
          </div>
          <div className={styles.signupButtons}>
            <PrimaryBtn
              name="Login"
              onClick={() => {
                navigate("/home");
              }}
            />
            <SecondaryBtn
              name="SignUp" /*onClick={() => navigate('/login')}*/
            />
          </div>
        </div>
      </div>
    </div>
  );
}
