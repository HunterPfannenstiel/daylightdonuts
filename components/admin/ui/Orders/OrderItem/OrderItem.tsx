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
        customerName={order.customer_info.name}
        orderDate={order.pickup_date}
        orderTime={order.pickup_time}
        orderContents={"Get order contents string"}
        extraContent={
          <HandleOrder
            onClick={handleModal}
            onPrintClick={() => {
              console.log("Print");
            }}
          />
        }
      />
      {showModal && (
        <OrderDetails
          priceDetails={order.price_details}
          paymentId={order.payment_uid}
          email={order.customer_info.email}
          orderPlaced={order.created_on}
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
