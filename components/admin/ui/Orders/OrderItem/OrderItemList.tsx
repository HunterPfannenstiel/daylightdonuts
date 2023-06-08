"use client";

import { DBOrder, LabelBlock, OrderLabelDetails } from "@_types/admin/orders";
import { FunctionComponent } from "react";
import OrderItem from "./OrderItem";
import classes from "./OrderItemList.module.css";

interface OrderItemListProps {
  orders: DBOrder[] | undefined;
  onSelectedForPrint: (
    id: number,
    details?: OrderLabelDetails,
    labelBlocks?: LabelBlock[]
  ) => void;
}

const OrderItemList: FunctionComponent<OrderItemListProps> = ({
  orders,
  onSelectedForPrint,
}) => {
  if (orders && orders.length > 0) {
    return (
      <ul className={classes.orders}>
        {orders.map((order) => (
          <OrderItem
            key={order.order_id}
            order={order}
            onSelectedForPrint={onSelectedForPrint}
          />
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
