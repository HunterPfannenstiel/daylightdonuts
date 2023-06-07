"use client";

import { DBOrder } from "@_types/admin/orders";
import { FunctionComponent } from "react";
import OrderItem from "./OrderItem";
import classes from "./OrderItemList.module.css";

interface OrderItemListProps {
  orders: DBOrder[] | undefined;
}

const OrderItemList: FunctionComponent<OrderItemListProps> = ({ orders }) => {
  if (orders && orders.length > 0) {
    return (
      <ul className={classes.orders}>
        {orders.map((order) => (
          <OrderItem key={order.order_id} order={order} />
        ))}
      </ul>
    );
  } else {
    return (
      <div className={classes.no_orders}>
        <h2>No Orders for this range</h2>
      </div>
    );
  }
};

export default OrderItemList;
