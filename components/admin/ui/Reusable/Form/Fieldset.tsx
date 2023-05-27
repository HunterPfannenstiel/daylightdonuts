import { FunctionComponent, ReactNode } from "react";
import classes from "./Fieldset.module.css";

interface FieldsetProps {
  children: ReactNode;
  legend?: string;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({ children, legend }) => {
  return (
    <fieldset className={classes.fieldset}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
