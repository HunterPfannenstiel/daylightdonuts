import { FunctionComponent } from "react";
import classes from "./NumericInput.module.css";

interface NumericInputProps {
  inputId: string;
  label: string;
  inputType?: string;
  handler: (inputValue: string) => void;
  required?: boolean;
  defaultValue?: string;
  value?: string;
}

const NumericInput: FunctionComponent<NumericInputProps> = () => {
  return <></>;
};

export default NumericInput;
