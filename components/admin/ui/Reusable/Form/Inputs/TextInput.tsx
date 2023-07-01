import { ChangeEvent, FunctionComponent } from "react";
import classes from "./TextInput.module.css";

interface TextInputProps {
  inputId: string;
  label: string;
  inputType?: string;
  handler: (inputValue: string) => void;
  required?: boolean;
  defaultValue?: string;
  isTextArea?: boolean;
  value?: string;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  inputId,
  label,
  inputType,
  handler,
  required,
  defaultValue,
  isTextArea = false,
  value,
}) => {
  return (
    <div className={classes.input}>
      <label htmlFor={inputId}>{label}</label>
      {!isTextArea && (
        <input
          id={inputId}
          type={inputType}
          onChange={(e) => {
            handler(e.target.value);
          }}
          value={value}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {isTextArea && (
        <textarea
          className={classes.textarea}
          id={inputId}
          onChange={(e) => {
            handler(e.target.value);
          }}
          required={required}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
};

export default TextInput;
