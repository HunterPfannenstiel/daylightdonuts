import { FunctionComponent, ReactNode } from "react";
import classes from "./Fieldset.module.css";

interface FieldsetProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <fieldset className={classes.fieldset + " " + className}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
