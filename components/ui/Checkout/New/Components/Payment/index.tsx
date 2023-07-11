import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import Radio from "components/ui/Reusable/Radio";
import PaypalIcon from "components/ui/svg/PaypalIcon";
import StripeElements from "components/ui/Checkout/Form/PaymentForm/Stripe/StripeElements";
import PayPal from "components/ui/Checkout/Form/PaymentForm/PayPal/PayPal";

interface PaymentProps {
  setLoading: (loading: boolean) => void;
  checkCustomerForm: () => boolean;
  setIsPayPalSelected: (selected: boolean) => void;
  postOrder: () => void;
}

const Payment: FunctionComponent<PaymentProps> = ({
  setLoading,
  checkCustomerForm,
  setIsPayPalSelected,
  postOrder,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const handleRadioClick = (selected: number) => {
    setSelectedRadio(selected);
    setIsPayPalSelected(selected === 0);
  };
  return (
    <CheckoutContainer header="Payment Information">
      <div className={classes.radio}>
        <Radio
          label="Paypal"
          onClick={handleRadioClick.bind(null, 0)}
          icon={<PaypalIcon />}
          checked={selectedRadio === 0}
        />
        <Radio
          label="Stripe"
          onClick={handleRadioClick.bind(null, 1)}
          checked={selectedRadio === 1}
        />
      </div>
      {selectedRadio === 0 && (
        <PayPal checkCustomerForm={checkCustomerForm} postOrder={postOrder} />
      )}
      {selectedRadio === 1 && (
        <StripeElements
          setLoading={setLoading}
          checkCustomerForm={checkCustomerForm}
        />
      )}
    </CheckoutContainer>
  );
};

export default Payment;
