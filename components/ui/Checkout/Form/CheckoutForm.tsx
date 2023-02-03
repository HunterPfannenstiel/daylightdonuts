import { FunctionComponent } from "react";
import ICheckoutForm from "./ICheckoutForm";

interface CheckoutFormProps {
  subtotal: number;
  playAnimation: boolean;
}

const CheckoutForm: FunctionComponent<CheckoutFormProps> = ({
  subtotal,
  playAnimation,
}) => {
  return (
    <ICheckoutForm
      subtotal={subtotal}
      playAnimation={playAnimation}
      showForm={subtotal > 0}
    />
  );
};

export default CheckoutForm;
