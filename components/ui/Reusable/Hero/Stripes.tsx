import { FunctionComponent } from "react";
import classes from "./Stripes.module.css";

interface StripesProps {
  className?: string;
}

const Stripes: FunctionComponent<StripesProps> = ({ className }) => {
  const classN = className
    ? `${classes.stripes} ${className}`
    : classes.stripes;
  return <div className={classN}></div>;
};

export default Stripes;
