import { FunctionComponent } from "react";
import classes from "./CheckoutTextInput.module.css";
import InputLayout from "./InputLayout";

interface CheckoutTextInputProps {
  label: string;
  onInputChange: (value: string) => void;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

const CheckoutTextInput: FunctionComponent<CheckoutTextInputProps> = ({
  label,
  onInputChange,
  required,
  defaultValue,
  placeholder,
  type,
  className,
}) => {
  return (
    <InputLayout
      className={className}
      labelComponent={
        <label htmlFor={label}>
          {label}
          {required && <span>*</span>}
        </label>
      }
      inputComponent={
        <input
          className={classes.input}
          type={type || "text"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          id={label}
          required={required}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
        />
      }
    />
  );
};

export default CheckoutTextInput;
