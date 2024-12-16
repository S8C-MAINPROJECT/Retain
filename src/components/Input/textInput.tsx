import { useState } from 'react';
import styles from './textInput.module.css';

function TextInput({placeholder,onChange,value}:{placeholder: string,onChange: (e:any)=> void,value: string}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event:any) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className={`${styles.inputContainer} ${isFocused ? styles.focused : ''}`}>
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
      <label>{placeholder}</label>
    </div>
  );
}

export default TextInput;
