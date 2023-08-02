import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import classes from "./TextInput.module.css";
import { concatClassNames } from "@_utils/client";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  inputType?: string;
  handler: (value: string) => void;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  inputType,
  id,
  className,
  handler,
  ...restProps
}) => {
  return (
    <div className={concatClassNames(classes.input, className)}>
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
