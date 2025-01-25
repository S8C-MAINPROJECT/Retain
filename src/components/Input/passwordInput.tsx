import { useState } from 'react'; 
import styles from './passwordInput.module.css';
import EyeIcon from './Assets/eye.svg';
import CrossedEyeIcon from './Assets/crossed-eye.svg'; 

type PROPS = {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string; 
  style?: React.CSSProperties;
  label?: string; // ✅ Added label prop
};

function PasswordInput({ value, onChange, placeholder, style, label = "Password" }: PROPS) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: { target: { value: string } }) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`${styles.inputContainer} ${isFocused ? styles.focused : ''}`}>
      <input
        type={showPassword ? 'text' : 'password'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
      <label>{label}</label> {/* ✅ Dynamic label */}
      <div className={styles.passwordToggle} onClick={togglePasswordVisibility}>
        {showPassword ? (
          <img src={CrossedEyeIcon} alt="Hide Password" className={styles.eyeIcon} />
        ) : (
          <img src={EyeIcon} alt="Show Password" className={styles.eyeIcon} />
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
