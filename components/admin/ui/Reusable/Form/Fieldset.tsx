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
    <fieldset className={`${className ? className : ""}`}>
      {legend && <legend className={classes.legend}>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
