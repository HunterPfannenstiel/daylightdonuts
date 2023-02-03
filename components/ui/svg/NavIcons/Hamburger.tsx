import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./Hamburger.module.css";

interface HamburgerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

const Hamburger: FunctionComponent<HamburgerProps> = ({ open, ...props }) => {
  return (
    <div
      className={`${classes.div_hamburger} ${open ? classes.modal_open : ""}`}
      {...props}
    >
      <div className={classes.one} />
      <div className={classes.two} />
      <div className={classes.three} />
    </div>
  );
};

export default Hamburger;
