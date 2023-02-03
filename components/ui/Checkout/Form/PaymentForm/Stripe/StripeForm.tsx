import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import useStripeClient from "@_hooks/stripe/useStripeClient";
import { useNotification } from "@_providers/Notification/Notification";
import { CustomerInfo } from "@_types/payment";
import { postOptimisticOrder } from "@_utils/payment/stripe";
import { FormEvent, FunctionComponent } from "react";
import classes from "./StripeForm.module.css";

interface StripeFormProps {
  customerInfo: CustomerInfo;
  setLoading: (loading: boolean) => void;
  checkCustomerForm: () => boolean;
}

const StripeForm: FunctionComponent<StripeFormProps> = ({
  customerInfo,
  setLoading,
  checkCustomerForm,
}) => {
  const { stripe, elements } = useStripeClient();
  const { displayNotification } = useNotification();
  //Create state to keep track of payment, errors, etc...

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (checkCustomerForm()) {
      if (!stripe || !elements) {
        //Stripe.js has not yet loaded
        //Make sure to disable form submission until Stripe.js has loaded
        return;
      }

      setLoading(true);
      try {
        await postOptimisticOrder(customerInfo);
      } catch (e: any) {
        setError();
        displayNotification(e.message, "error", 2000);
        setLoading(false);
        return;
      }
      const { error } = await stripe.confirmPayment({
        elements: elements,
        confirmParams: {
          return_url: `${process.env
            .NEXT_PUBLIC_DOMAIN!}/checkout?orderStatus=success`,
        },
      });

      //This will catch any immediate errors
      if (error.type === "card_error" || error.type === "validation_error") {
        //Display Notification using: error.message
        setError();
        displayNotification(error.message!, "error", 2000);
      } else {
        //Display Notification using: An unexpected error occurred
        setError();
        displayNotification(
          "An unexpected error occurred with stripe. Your order has not been submitted and payment has not been charged",
          "error",
          5000
        );
      }
      setLoading(false);
    } else {
      displayNotification("Missing pickup details", "error", 3000);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
    </form>
  );
};

const setError = () => {
  fetch("/api/cart/has-error", { method: "POST" });
};

export default StripeForm;
