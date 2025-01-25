import { useState } from "react";
import TextField from "../../components/Input/textInput";
import PasswordField from "../../components/Input/passwordInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import styles from "./SignUp.module.css";
import logo from "./Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // Use the configured Axios instance

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ Added confirm password
  const [error, setError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // ✅ State to track confirm password field error

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setConfirmPasswordError(true); // ✅ Highlight the confirm password field
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/users/register/",
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Some error. Please try again.");
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
            <h1>SignUp</h1>
            <h6>Create an account</h6>
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
              label="Password" // ✅ Explicitly set
            />
            <PasswordField
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(false);
              }}
              label="Confirm Password" // ✅ Now the second field is labeled correctly
              style={confirmPasswordError ? { border: "2px solid red" } : {}}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.signupButtons}>
            <PrimaryBtn name="SignUp" onClick={handleSignup} />
            <SecondaryBtn name="Login" onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
