import { FunctionComponent, ReactNode } from "react";
import classes from "./Buttons.module.css";
import MenuButton from "./MenuButton";
import PaymentButton from "./PaymentButton";

interface ButtonsProps {
  disabled?: boolean;
  buttonHandler?: () => void;
  children?: ReactNode;
}

const Buttons: FunctionComponent<ButtonsProps> = ({
  disabled,
  buttonHandler,
  children,
}) => {
  const handlePaymentButton = () => {
    if (buttonHandler) {
      buttonHandler();
    }
  };
  return (
    <div className={classes.buttons}>
      {children}
      <PaymentButton buttonHandler={handlePaymentButton} disabled={disabled} />
      <MenuButton disabled={disabled} />
    </div>
  );
};

export default Buttons;
