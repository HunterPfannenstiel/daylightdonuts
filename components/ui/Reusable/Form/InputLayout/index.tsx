import { Fragment, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/client";

interface InputLayoutProps {
  label: string;
  htmlFor: string;
  inputComponent: ReactNode;
  gap?: string;
  direction?: "row" | "column";
  className?: string;
}

const InputLayout: FunctionComponent<InputLayoutProps> = ({
  label,
  htmlFor,
  inputComponent,
  gap,
  direction,
  className,
}) => {
  const styles = { gap, flexDirection: direction };
  return (
    <div
      className={concatClassNames(classes.container, className)}
      style={styles}
    >
      <label htmlFor={htmlFor}>{label}</label>
      {inputComponent}
    </div>
  );
};

export default InputLayout;
