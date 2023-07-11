import { OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FunctionComponent } from "react";
import classes from "./PayPal.module.css";
import useSuccess from "@_hooks/checkout/useSuccess";

interface PayPalProps {
  postOrder: () => void;
  checkCustomerForm: () => boolean;
}

const PayPal: FunctionComponent<PayPalProps> = ({
  postOrder,
  checkCustomerForm,
}) => {
  const completeOrder = useSuccess();
  const orderHandler = async () => {
    if (checkCustomerForm()) {
      const response = await fetch("/api/cart/payment/create-paypal-request");
      if (response.ok) {
        const id = await response.json();
        return id;
      } else {
        const error = await response.json();
        return Promise.reject(error);
      }
    } else {
      return Promise.reject("Please fill in the form");
    }
  };
  const approveHandler = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    if (actions.order) {
      try {
        await postOrder();
        await actions.order.capture(); //This is important, it charges the user, if we don't do this, no funds are captured
        completeOrder();
      } catch (error) {
        console.log(error);
      }
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
