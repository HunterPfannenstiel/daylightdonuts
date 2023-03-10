import { PaymentProcessor } from "@_types/admin/orders";
import Background from "components/ui/Reusable/Modal/Background";
import Modal from "components/ui/Reusable/Modal/Modal";
import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./OrderDetails.module.css";

interface OrderDetailsProps {
  paymentId: string;
  email: string;
  paymentProcessor: PaymentProcessor;
  orderPlaced: Date;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  paymentId,
  email,
  paymentProcessor,
  orderPlaced,
  handleModal,
  playAnimation,
  animationTime,
}) => {
  const className = `${classes.modal_content} ${
    playAnimation ? classes.animate_out : ""
  }`;
  return (
    <Modal selector="#modal">
      <div className={className}>
        <h2>Payment Details</h2>
        <Link
          href={getPaymentLink(paymentProcessor, paymentId)}
          target="_blank"
        >
          View Payment Transaction
        </Link>
        <p>{`Email: ${email}`}</p>
        <p>{`Order Placed: ${new Date(orderPlaced).toDateString()}`}</p>
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
  }
};

export default OrderDetails;
