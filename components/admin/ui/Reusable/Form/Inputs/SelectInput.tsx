import { FunctionComponent } from "react";
import classes from "./SelectInput.module.css";

interface SelectInputProps {
  inputId: string;
  label: string;
  handler: (isSelected: boolean) => void;
  defaultChecked: boolean;
  type: "radio" | "checkbox";
  radioName?: string;
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
  inputId,
  label,
  handler,
  defaultChecked,
  type,
  radioName,
}) => {
  const className =
    type === "radio"
      ? `${classes.input} ${classes.radio}`
      : `${classes.input} ${classes.checkbox}`;
  return (
    <div className={className}>
      <input
        type={type}
        defaultChecked={defaultChecked}
        id={inputId}
        onChange={(e) => {
          handler(e.target.checked);
        }}
        name={radioName}
      />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

export default SelectInput;
