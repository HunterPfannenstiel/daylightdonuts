import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./Heading.module.css";

interface HeadingProps {
  children: ReactNode;
  position?: "left" | "center" | "right";
}

const Heading: FunctionComponent<HeadingProps> = ({ children, position }) => {
  const margin: CSSProperties =
    position === "center"
      ? { marginInline: "auto" }
      : position === "right"
      ? { marginLeft: "auto" }
      : {};
  return (
    <div className={classes.yellow_border} style={margin}>
      <div className={classes.blue_background}>{children}</div>
    </div>
  );
};

export default Heading;
