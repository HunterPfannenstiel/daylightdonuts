import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { DBOrder } from "@_types/admin/orders";
import { getOrderContentString } from "@_utils/orders";
import { FunctionComponent, useState } from "react";
import IOrderItem from "../../Reusable/Order/IOrderItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import HandleOrder from "./HandleOrder";
import classes from "./OrderItem.module.css";

interface OrderItemProps {
  order: DBOrder;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ order }) => {
  const { playAnimation, showModal, handleModal } = useAnimateModal(300);
  return (
    <div>
      <IOrderItem
        className={classes.order}
        storeName={order.location}
        customerName={order.name}
        orderDate={order.date}
        orderTime={order.time}
        orderContents={getOrderContentString(order.order_contents)}
        extraContent={<HandleOrder onClick={handleModal} />}
      />
      {showModal && (
        <OrderDetails
          paymentId={order.payment_id}
          email={order.email}
          orderPlaced={order.last_modified}
          paymentProcessor={order.payment_processor}
          handleModal={handleModal}
          playAnimation={playAnimation}
          animationTime={300}
        />
      )}
    </div>
  );
};

export default OrderItem;
