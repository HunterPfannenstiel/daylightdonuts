import { CustomerInfo } from "@_types/database/checkout";
import Radio from "components/ui/Reusable/Radio";
import PaypalIcon from "components/ui/svg/PaypalIcon";
import { FunctionComponent, useState } from "react";
import classes from "./PaymentForm.module.css";
import PayPal from "./PayPal/PayPal";

import StripeElements from "./Stripe/StripeElements";

interface PaymentFormProps {
  customerInfo: CustomerInfo;
  className?: string;
  setLoading: (loading: boolean) => void;
  checkCustomerForm: () => boolean;
}
//TODO: Setup up PayPal webhook to finish integration
const PaymentForm: FunctionComponent<PaymentFormProps> = ({
  customerInfo,
  className,
  setLoading,
  checkCustomerForm,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const handleRadioClick = (selected: number) => {
    setSelectedRadio(selected);
  };
  return (
    <div className={classes.payment + " " + className}>
      <h2>Payment Information</h2>
      <div className={classes.radio}>
        <Radio
          label="Stripe"
          defaultChecked
          onClick={handleRadioClick.bind(null, 0)}
        />
        <Radio
          label="Paypal"
          onClick={handleRadioClick.bind(null, 1)}
          icon={<PaypalIcon />}
        />
      </div>
      {selectedRadio === 0 && (
        <StripeElements
          customerInfo={customerInfo}
          setLoading={setLoading}
          checkCustomerForm={checkCustomerForm}
        />
      )}
      {selectedRadio === 1 && <PayPal customerInfo={customerInfo} />}
    </div>
  );
};

export default PaymentForm;
