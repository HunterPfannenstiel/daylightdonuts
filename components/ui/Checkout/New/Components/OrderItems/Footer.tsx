import { FunctionComponent } from "react";
import classes from "./Footer.module.css";

interface FooterProps {
  subtotal?: string;
}

const Footer: FunctionComponent<FooterProps> = ({ subtotal }) => {
  return (
    <div className={classes.footer}>
      <p className={classes.text}>Order Subtotal</p>
      {subtotal ? <p>${subtotal}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Footer;
