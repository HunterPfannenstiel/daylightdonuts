import { DBOrder, LabelBlock, PaymentProcessor } from "@_types/admin/orders";
import Background from "components/ui/Reusable/Modal/Background";
import Modal from "components/ui/Reusable/Modal/Modal";
import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./OrderDetails.module.css";
import LabelPreview from "./LabelPreview";

interface OrderDetailsProps {
  order: DBOrder;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
  labelBlocks: LabelBlock[];
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  order,
  handleModal,
  playAnimation,
  animationTime,
  labelBlocks,
}) => {
  const className = `${classes.modal_content} ${
    playAnimation ? classes.animate_out : ""
  }`;
  return (
    <Modal selector="modal">
      <div className={className}>
        <div>
          <h2>Payment Details</h2>
          <Link
            href={getPaymentLink(order.payment_processor, order.payment_uid)}
            target="_blank"
          >
            View Payment Transaction
          </Link>
          <p>{`Email: ${order.customer_info.email}`}</p>
          <p>{`Order Placed: ${order.created_on}`}</p>
          <p>{`Subtotal: ${order.price_details.subtotal}`}</p>
          <p>{`Tax: ${order.price_details.tax}`}</p>
          <p>{`Total: ${(
            order.price_details.subtotal + order.price_details.tax
          ).toFixed(2)}`}</p>
        </div>
        <LabelPreview
          imageSrc={undefined}
          labelBlocks={labelBlocks}
          storeName={order.location}
          customerName={order.customer_info.name}
          date={order.pickup_date}
          time={order.pickup_time}
        />
      </div>
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
      />
    </Modal>
  );
};

const getPaymentLink = (processor: PaymentProcessor, paymentId: string) => {
  switch (processor) {
    case "Stripe":
      return `https://dashboard.stripe.com/test/payments/${paymentId}`;
    case "PayPal":
      return "https://paypal.com";
    default:
      return "https://postmalone.com";
  }
};

export default OrderDetails;
