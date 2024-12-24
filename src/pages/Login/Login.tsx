import { useState } from "react";
import TextField from "../../components/Input/textInput";
import PasswordField from "../../components/Input/passwordInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import styles from "./Login.module.css";
import logo from "./Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // Use the configured Axios instance

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the home page
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className={styles.signup}>
      <div className={styles.signupBoundingbox}>
        <div className={styles.signupBoundingboxText}>
          <div className={styles.nameAndLogo}>
            <img src={logo} alt="Logo" />
            <h3>Retain</h3>
          </div>
          <div className={styles.signupBoundingboxTextInner}>
            <h1>Login</h1>
            <h6>Enter your credentials to continue</h6>
          </div>
          <div className={styles.signupField}>
            <TextField
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.signupButtons}>
            <PrimaryBtn name="Login" onClick={handleLogin} />
            <SecondaryBtn name="SignUp" onClick={() => navigate("/signup")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
