import { useElements, useStripe } from "@stripe/react-stripe-js";
import { getNotificationMessage } from "@_utils/payment";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useStripeClient = () => {
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
        //display this message
        const message = getNotificationMessage(paymentIntent);
      });
  }, [stripe]);

  return {
    stripe,
    elements,
  };
};

export default useStripeClient;
