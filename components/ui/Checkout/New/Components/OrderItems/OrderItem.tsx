import { FunctionComponent } from "react";
import classes from "./OrderItem.module.css";
import ImageComponent from "components/ui/Reusable/Image/ImageComponent";
import { CartItem, CartSectionDetails } from "@_types/cart";
import OrderItemExtras from "./OrderItemExtras";

interface OrderItemProps {
  item: CartItem;
  details: CartSectionDetails;
  removeFromCart: () => void;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({
  item,
  details,
  removeFromCart,
}) => {
  const extraPrice = item.extraPrice || 0;
  const price = (+details.price + extraPrice) * item.amount;
  return (
    <li className={classes.order_item}>
      <div>
        <ImageComponent
          src={details.imageUrl}
          width={100}
          height={100}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.item_info}>
          <p className={classes.name}>{details.name}</p>
          <div>
            <OrderItemExtras extras={item.extras} />
          </div>
        </div>
        <div className={classes.price}>
          <p>${price.toFixed(2)}</p>
          <p onClick={removeFromCart}>X</p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
