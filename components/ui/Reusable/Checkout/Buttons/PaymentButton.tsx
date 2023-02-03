import Link from "next/link";
import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./PaymentButton.module.css";

interface PaymentButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  buttonHandler?: () => void;
}

const PaymentButton: FunctionComponent<PaymentButtonProps> = ({
  disabled,
  buttonHandler,
  ...props
}) => {
  const className = classes.payment + " " + (disabled ? classes.disabled : "");
  return (
    <Link
      onClick={buttonHandler}
      href="/checkout?page=Payment"
      className={className}
      {...props}
    >
      Go to Payment
    </Link>
  );
};

export default PaymentButton;
