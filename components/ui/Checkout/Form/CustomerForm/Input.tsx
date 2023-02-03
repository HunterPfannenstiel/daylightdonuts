import { forwardRef, FunctionComponent, InputHTMLAttributes } from "react";
import classes from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
  keyName: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, label, keyName, ...rest }, inputRef) => {
    return (
      <div className={classes.input_content}>
        <input
          {...rest}
          placeholder={placeholder}
          required
          id={keyName}
          name={keyName}
          className={classes.input}
          ref={inputRef}
        />
        <label htmlFor={keyName} className={classes.label}>
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
