import { DBOrder } from "@_types/admin/orders";
import { FunctionComponent } from "react";
import OrderItem from "./OrderItem";
import classes from "./OrderItemList.module.css";

interface OrderItemListProps {
  orders: DBOrder[] | undefined;
}

const OrderItemList: FunctionComponent<OrderItemListProps> = ({ orders }) => {
  if (orders) {
    return (
      <ul className={classes.orders}>
        {orders.map((order) => (
          <OrderItem key={order.order_id} order={order} />
        ))}
      </ul>
    );
  } else {
    return <></>;
  }
};

export default OrderItemList;
