import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import classes from "./SelectInput.module.css";
import { concatClassNames } from "@_utils/client";

interface SelectInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  handler: (isSelected: boolean) => void;
  type: "radio" | "checkbox";
  radioName?: string;
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
  label,
  handler,
  type,
  radioName,
  id,
  className,
  ...restProps
}) => {
  const cN =
    type === "radio"
      ? `${classes.input} ${classes.radio}`
      : `${classes.input} ${classes.checkbox}`;
  return (
    <div className={concatClassNames(cN, className)}>
      <input
        type={type}
        id={id}
        onChange={(e) => {
          handler(e.target.checked);
        }}
        name={radioName}
        {...restProps}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default SelectInput;
