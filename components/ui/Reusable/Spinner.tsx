import { FunctionComponent } from "react";
import classes from "./Spinner.module.css";

interface SpinnerProps {}

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return <div className={classes.spinner} />;
};

export default Spinner;
