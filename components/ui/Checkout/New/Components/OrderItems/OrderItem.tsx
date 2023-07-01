import { FunctionComponent } from "react";
import classes from "./OrderItem.module.css";
import ImageComponent from "components/ui/Reusable/Image/ImageComponent";

export type OrderItem = {
  imageUrl: string;
  name: string;
  price: number;
  amount: number;
  description: string;
};

interface OrderItemProps {
  item: OrderItem;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ item }) => {
  return (
    <li className={classes.order_item}>
      <div>
        <ImageComponent
          src={item.imageUrl}
          width={100}
          height={100}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.item_info}>
          <p className={classes.name}>{item.name}</p>
          <p className={classes.description}>{item.description}</p>
        </div>
        <div className={classes.price}>
          <p>${item.price}</p>
          <p>X</p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
