import { FunctionComponent } from "react";
import classes from "./Footer.module.css";

interface FooterProps {
  subtotal: number;
}

const Footer: FunctionComponent<FooterProps> = ({ subtotal }) => {
  return (
    <div className={classes.footer}>
      <p className={classes.text}>Order Subtotal</p>
      <p>${subtotal}</p>
    </div>
  );
};

export default Footer;
