import { FunctionComponent } from "react";
import classes from "./Spinner.module.css";
import { concatClassNames } from "@_utils/client";

interface SpinnerProps {
  center?: boolean;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ center }) => {
  return (
    <>
      <div
        className={concatClassNames(
          classes.spinner,
          center ? classes.center : undefined
        )}
      />
    </>
  );
};

export default Spinner;
