import { useState } from "react";
import TextField from "../../components/Input/textInput";
import PasswordField from "../../components/Input/passwordInput";
import PrimaryBtn from "../../components/Button/PrimaryBtn";
import SecondaryBtn from "../../components/Button/secondaryBtn";
import styles from "./Login.module.css";
import logo from "./Assets/logo.svg";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

export default function SignUp() {
  /*const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/api/v1';

  const validateFields = () => {
    if (!username || !email || !password) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  }

  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }
    try {
      // Make API call to your localhost
      const response = await axios.post(`${baseUrl}/auth/register`, {
        email: email,
        username: username,
        password: password
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      // Handle response
      if (response.status === 200) {
        navigate('/login');
      } else {
      //something
      }
    } catch (error) {
      toast.error('Error Signing Up');
    }
  };*/

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
            <PrimaryBtn name="SignUp" /*onClick={handleSignUp}*/ />
            <SecondaryBtn
              name="Log In instead" /*onClick={() => navigate('/login')}*/
            />
          </div>
        </div>
      </div>
    </div>
  );
}
