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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful",JSON.stringify(user));

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
        <img className={styles.signupimg} src="src/pages/Login/Assets/whole.png"  alt="" />
        <div className={styles.signupBoundingboxText}>
          <div className={styles.nameAndLogo}>
            <img src={logo} alt="Logo" />
            <h3>Retain</h3>
          </div>
          <div className={styles.signupBoundingboxTextInner}>
            <h1>Login</h1>
            {error ? <p className={styles.error}>{error}</p>:<h5>Enter your credentials to continue</h5>}
            
          </div>
          <div className={styles.signupField}>
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
          <div className={styles.signupButtons}>
            <PrimaryBtn name="Login" onClick={handleLogin} />
            <SecondaryBtn name="SignUp Instead" onClick={() => navigate("/signup")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
