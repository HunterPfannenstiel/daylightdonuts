import { useCart } from "@_providers/old-cart/optimistic";
import CartIcon from "components/ui/svg/NavIcons/CartIcon";
import { FunctionComponent } from "react";
import classes from "./Cart.module.css";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const { cart } = useCart();
  return (
    <div className={classes.cart}>
      <CartIcon />
      {cart && <span className={classes.item_count}>{cart.totalItems}</span>}
    </div>
  );
};

export default Cart;
