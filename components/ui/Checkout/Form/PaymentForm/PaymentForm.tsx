import Radio from "components/ui/Reusable/Radio";
import PaypalIcon from "components/ui/svg/PaypalIcon";
import { FunctionComponent, useState } from "react";
import classes from "./PaymentForm.module.css";
import PayPal from "./PayPal/PayPal";

import StripeElements from "./Stripe/StripeElements";

interface PaymentFormProps {
  className?: string;
  setLoading: (loading: boolean) => void;
  checkCustomerForm: () => boolean;
  setIsPayPalSelected: (selected: boolean) => void;
}
//TODO: Setup up PayPal webhook to finish integration
const PaymentForm: FunctionComponent<PaymentFormProps> = ({
  className,
  setLoading,
  checkCustomerForm,
  setIsPayPalSelected,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const handleRadioClick = (selected: number) => {
    setSelectedRadio(selected);
    setIsPayPalSelected(selected === 0);
  };
  return (
    <div className={classes.payment + " " + className}>
      <h2>Payment Information</h2>
      <div className={classes.radio}>
        <Radio
          label="Paypal"
          defaultChecked
          onClick={handleRadioClick.bind(null, 0)}
          icon={<PaypalIcon />}
        />
        <Radio label="Stripe" onClick={handleRadioClick.bind(null, 1)} />
      </div>
      {selectedRadio === 0 && <PayPal checkCustomerForm={checkCustomerForm} />}
      {selectedRadio === 1 && (
        <StripeElements
          setLoading={setLoading}
          checkCustomerForm={checkCustomerForm}
        />
      )}
    </div>
  );
};

export default PaymentForm;
