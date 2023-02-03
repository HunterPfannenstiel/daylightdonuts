import { FunctionComponent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { useQuery } from "@tanstack/react-query";
import { fetchStripeClientSecret } from "@_utils/payment/stripe";
import { CustomerInfo } from "@_types/payment";

interface StripeElementsProps {
  customerInfo: CustomerInfo;
  setLoading: (loading: boolean) => void;
  checkCustomerForm: () => boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const StripeElements: FunctionComponent<StripeElementsProps> = ({
  customerInfo,
  setLoading,
  checkCustomerForm,
}) => {
  const { data: clientSecret } = useQuery(["stripe"], fetchStripeClientSecret);
  const appearance = {};

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm
            customerInfo={customerInfo}
            setLoading={setLoading}
            checkCustomerForm={checkCustomerForm}
          />
        </Elements>
      )}
    </>
  );
};

export default StripeElements;
