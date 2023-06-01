import { useElements, useStripe } from "@stripe/react-stripe-js";
import { getNotificationMessage } from "@_utils/payment";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useNotification } from "@_providers/Notification/Notification";
import useSuccess from "@_hooks/checkout/useSuccess";

const useStripeClient = () => {
  const completeOrder = useSuccess();
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = searchParams?.get("payment_intent_client_secret");
    if (clientSecret === "undefined" || !clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret as string)
      .then(({ paymentIntent }) => {
        const message = getNotificationMessage(paymentIntent);
        const { displayNotification } = useNotification();
        if (
          message !== "Payment Succeeded!" &&
          message !== "Payment is Processing"
        ) {
          displayNotification(message, "error", 2000);
        } else if (message === "Payment Succeeded!") {
          completeOrder();
        }
      });
  }, [stripe]);

  return {
    stripe,
    elements,
  };
};

export default useStripeClient;
