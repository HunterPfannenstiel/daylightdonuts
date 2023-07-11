import { FunctionComponent } from "react";
import classes from "./index.module.css";
import TotalItem from "./TotalItem";

interface TotalsProps {
  subtotal: string;
  tax: string;
}

const Totals: FunctionComponent<TotalsProps> = ({ subtotal, tax }) => {
  return (
    <div className={classes.container}>
      <TotalItem label="Order Subtotal" total={subtotal} />
      <TotalItem label="Tax" total={tax} />
      <div className={classes.total}>
        <p>Total</p>
        <p>${(+subtotal + +tax).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Totals;
