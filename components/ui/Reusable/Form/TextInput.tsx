import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import classes from "./TextInput.module.css";
import { concatClassNames } from "@_utils/client";

export interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  gap?: string;
  flexDirection?: "row" | "column";
  inputType?: string;
  handler: (value: string) => void;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  gap,
  flexDirection = "column",
  inputType,
  id,
  className,
  handler,
  ...restProps
}) => {
  return (
    <div
      className={concatClassNames(classes.input, className)}
      style={{ flexDirection, gap }}
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={inputType}
        onChange={(e) => {
          handler(e.target.value);
        }}
        {...restProps}
      />
    </div>
  );
};

export default TextInput;
