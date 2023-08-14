import { FunctionComponent, InputHTMLAttributes } from "react";
import classes from "./CheckoutTextInput.module.css";
import InputLayout from "./InputLayout";

interface CheckoutTextInputProps {
  label: string;
  inputSettings: InputHTMLAttributes<HTMLInputElement>;
  onInputChange: (value: string) => void;
  className?: string;
}

const CheckoutTextInput: FunctionComponent<CheckoutTextInputProps> = ({
  label,
  onInputChange,
  inputSettings,
  className,
}) => {
  return (
    <InputLayout
      className={className}
      htmlFor={label}
      label={`${label}*`}
      inputComponent={
        <input
          className={classes.input}
          {...inputSettings}
          id={label}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
        />
      }
    />
  );
};

export default CheckoutTextInput;
