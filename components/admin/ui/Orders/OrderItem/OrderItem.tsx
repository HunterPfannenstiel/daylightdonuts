import { DBOrder } from "@_types/admin/orders";
import { getOrderContentString } from "@_utils/orders";
import { FunctionComponent } from "react";
import IOrderItem from "../../Reusable/Order/IOrderItem";
import HandleOrder from "./HandleOrder";
import classes from "./OrderItem.module.css";

interface OrderItemProps {
  order: DBOrder;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ order }) => {
  return (
    <div>
      <IOrderItem
        className={classes.order}
        storeName={order.location}
        customerName={order.name}
        orderDate={order.date}
        orderTime={order.time}
        orderContents={getOrderContentString(order.order_contents)}
        extraContent={<HandleOrder />}
      />
    </div>
  );
};

export default OrderItem;
