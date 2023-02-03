import { useElements, useStripe } from "@stripe/react-stripe-js";
import { getNotificationMessage } from "@_utils/payment";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStripeClient = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = router.query.payment_intent_client_secret;
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
