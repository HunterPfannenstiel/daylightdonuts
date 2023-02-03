import { FunctionComponent } from "react";
import classes from "./Price.module.css";

interface PriceProps {
  subtotal: number;
}

const Price: FunctionComponent<PriceProps> = ({ subtotal }) => {
  const showPrice = subtotal <= 0 ? "0.00" : subtotal.toFixed(2);
  return (
    <div className={classes.price}>
      <h4>Subtotal</h4>
      <p>{`$ ${showPrice}`}</p>
    </div>
  );
};

export default Price;
