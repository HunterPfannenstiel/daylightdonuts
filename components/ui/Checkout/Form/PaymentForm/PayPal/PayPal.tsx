import { OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FunctionComponent } from "react";
import classes from "./PayPal.module.css";

interface PayPalProps {}

const PayPal: FunctionComponent<PayPalProps> = () => {
  const orderHandler = async () => {
    const response = await fetch("/api/cart/payment/create-paypal-request");
    if (response.ok) {
      const id = await response.json();
      return id;
    } else {
      const error = await response.json();
      return Promise.reject(error);
    }
  };
  const approveHandler = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    if (actions.order) {
      //This is important, it charges the user, if we don't do this, no funds are captured
      const details = await fetch("/api/cart/order/create-paypal-order", {
        method: "POST",
        body: JSON.stringify({ orderId: data.orderID }),
        headers: { "Content-Type": "application/json" },
      });
      // const details = await actions.order.capture();
      // console.log(`Transaction completed by ${details.payer.name?.given_name}`);
    }
  };
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
    >
      <div className={classes.paypal_buttons}>
        <PayPalButtons
          style={{ shape: "pill", height: 35 }}
          onApprove={approveHandler}
          createOrder={orderHandler}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPal;
