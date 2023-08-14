import { FunctionComponent } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import OrderItem from "./OrderItem";
import Footer from "./Footer";
import { CartContext } from "@_providers/Cart/utils";

interface OrderItemsProps {
  cartContext: CartContext;
}

const OrderItems: FunctionComponent<OrderItemsProps> = ({ cartContext }) => {
  const { cart, cartModifiers, getIterableItems } = cartContext;
  const sections = getIterableItems();
  return (
    <CheckoutContainer
      header="My Box"
      footer={<Footer subtotal={cart?.price} />}
    >
      <ul className={classes.items}>
        {sections.map((section) => {
          const { details, items } = section;
          return items.map((item) => {
            return (
              <OrderItem
                item={item}
                key={item.cartItemId}
                details={section.details}
                removeFromCart={cartModifiers.removeItemFromCart.bind(
                  null,
                  details.itemId,
                  item.cartItemId
                )}
              />
            );
          });
        })}
      </ul>
    </CheckoutContainer>
  );
};

export default OrderItems;
