import { FunctionComponent } from "react";
import classes from "./Price.module.css";

interface PriceProps {
  subtotal: number;
  tip: number;
}

const Price: FunctionComponent<PriceProps> = ({ subtotal, tip }) => {
  const tax = 0.06;
  const taxAmount = +(subtotal * tax).toFixed(2);
  const total = taxAmount + subtotal + tip;
  return (
    <div className={classes.info}>
      <div className={classes.amounts}>
        <div>
          <p>Subtotal</p>
          <p>{`$ ${subtotal.toFixed(2)}`}</p>
        </div>
        <div>
          <p>Tax</p>
          <p>{`$ ${taxAmount}`}</p>
        </div>
        {/* <div>
          <p>Tip</p>
          <p>{`$ ${tip.toFixed(2)}`}</p>
        </div> */}
      </div>
      <div className={classes.total}>
        <p>Total</p>
        <p>{`$ ${total.toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default Price;
