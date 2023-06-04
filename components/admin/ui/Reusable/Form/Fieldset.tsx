import { FunctionComponent, ReactNode } from "react";
import classes from "./Fieldset.module.css";

interface FieldsetProps {
  children: ReactNode;
  legend?: string;
  className?: string;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({
  children,
  legend,
  className,
}) => {
  return (
    <fieldset className={`${classes.fieldset} ${className ? className : ""}`}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
