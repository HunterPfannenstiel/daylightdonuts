import { CartGroups } from "@_types/database/cart";
import { FunctionComponent } from "react";
import Price from "./Price";
import Items from "./Items/Items";
import classes from "./OrderPage.module.css";
import Titles from "./Titles";

import Stripes from "components/ui/Reusable/Stripes";
import { useCartUpdates } from "@_providers/old-cart/CartUpdates/CartUpdates";
import Buttons from "components/ui/Reusable/Checkout/Buttons/Buttons";

interface OrderPageProps {
  groups: CartGroups;
  subtotal: number;
  totalItems: number;
  playAnimation: boolean;
}

const OrderPage: FunctionComponent<OrderPageProps> = ({
  groups,
  subtotal,
  totalItems,
  playAnimation,
}) => {
  const { modifiedPrice, triggerUpdates, isPendingUpdates } = useCartUpdates();

  const orderClass = playAnimation ? classes.animate_out : "";
  return (
    <section className={classes.order + " " + orderClass}>
      <div className={classes.content}>
        {subtotal > 0 && <Titles />}
        <Items groups={groups} />
        <Price subtotal={modifiedPrice + subtotal} />
        <Buttons disabled={isPendingUpdates}>
          {isPendingUpdates && (
            <button onClick={triggerUpdates} className={classes.update_button}>
              Update
            </button>
          )}
        </Buttons>
      </div>
      <Stripes mobileRender />
    </section>
  );
};

export default OrderPage;
