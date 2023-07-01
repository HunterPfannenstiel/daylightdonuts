import { Fragment, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

interface InputLayoutProps {
  labelComponent: ReactNode;
  inputComponent: ReactNode;
  className?: string;
}

const InputLayout: FunctionComponent<InputLayoutProps> = ({
  labelComponent,
  inputComponent,
  className,
}) => {
  const classN = className
    ? `${classes.container} ${className}`
    : classes.container;
  return (
    <div className={classN}>
      {labelComponent}
      {inputComponent}
    </div>
  );
};

export default InputLayout;
