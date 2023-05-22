import Stripes from "components/ui/Reusable/Stripes";
import { FunctionComponent, useRef, useState } from "react";
import Price from "./Price";
import classes from "./ICheckoutForm.module.css";
import CustomerInfo from "./CustomerForm/CustomerInfo";
import PaymentForm from "./PaymentForm/PaymentForm";
import MenuButton from "components/ui/Reusable/Checkout/Buttons/MenuButton";
import Spinner from "components/ui/Reusable/Spinner";
import { highlightInvalidInput } from "@_utils/payment/form";

interface ICheckoutFormProps {
  subtotal: number;
  playAnimation: boolean;
  showForm: boolean;
}

const ICheckoutForm: FunctionComponent<ICheckoutFormProps> = ({
  subtotal,
  playAnimation,
  showForm,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formClass = playAnimation ? classes.animate_out : "";
  const checkCustomerValidity = () => {
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        return true;
      } else {
        highlightInvalidInput(formRef.current);
        window.scroll(0, 0);
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <>
      {showForm && (
        <div className={classes.form_content + " " + formClass}>
          <form className={classes.form} ref={formRef}>
            <CustomerInfo />
          </form>
          <PaymentForm
            className={classes.form}
            setLoading={setIsLoading}
            checkCustomerForm={checkCustomerValidity}
          />
          <Price subtotal={subtotal} tip={16.1} />
          <div className={classes.button_container}>
            {!isLoading && (
              <button
                className={classes.button}
                type="submit"
                form="payment-form"
                onClick={() => {
                  checkCustomerValidity();
                }}
              >
                Place Order
              </button>
            )}
            {isLoading && <Spinner />}
          </div>
          <p className={classes.note}>
            *PLEASE ALLOW 1 HOUR TO PROCESS ORDERS*
          </p>
          <Stripes mobileRender />
        </div>
      )}
      {!showForm && (
        <div
          className={
            classes.form_content + " " + formClass + " " + classes.menu
          }
        >
          <h2>Add Items to Your Cart!</h2>
          <MenuButton />
        </div>
      )}
    </>
  );
};

export default ICheckoutForm;
