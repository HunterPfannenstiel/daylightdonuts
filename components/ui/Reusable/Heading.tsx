import { FunctionComponent, ReactNode } from "react";
import classes from "./Heading.module.css";

interface HeadingProps {
  headingNode: ReactNode;
}

const Heading: FunctionComponent<HeadingProps> = ({ headingNode }) => {
  return (
    <div className={classes.yellow_border}>
      <div className={classes.blue_background}>{headingNode}</div>
    </div>
  );
};

export default Heading;
