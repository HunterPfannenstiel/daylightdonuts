import { FunctionComponent } from "react";
import classes from "./OrderItemExtras.module.css";
import { CartItemExtra } from "@_types/cart";

interface OrderItemExtrasProps {
  extras?: CartItemExtra[];
}

const OrderItemExtras: FunctionComponent<OrderItemExtrasProps> = ({
  extras,
}) => {
  return (
    <>
      {extras?.map((extra) => {
        return (
          <p key={extra.text} className={classes.description}>
            {extra.text}
          </p>
        );
      })}
    </>
  );
};

export default OrderItemExtras;
