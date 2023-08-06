import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from "react";
import classes from "./SelectInput.module.css";
import { concatClassNames } from "@_utils/client";

interface SelectInputProps extends ComponentPropsWithoutRef<"input"> {
  label: ReactNode;
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
  return (
    <div
      className={concatClassNames(
        classes.input_container,
        type === "radio" ? classes.radio : classes.checkbox
      )}
    >
      <input
        type={type}
        id={id}
        onChange={(e) => {
          handler(e.target.checked);
        }}
        name={radioName}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={concatClassNames(classes.label, className)}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectInput;
