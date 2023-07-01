import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

interface CheckoutContainerProps {
  children: ReactNode;
  header: string;
  footer?: ReactNode;
}

const CheckoutContainer: FunctionComponent<CheckoutContainerProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>{header}</h2>
      </div>
      <div className={classes.content}>{children}</div>
      {footer ? footer : null}
    </div>
  );
};

export default CheckoutContainer;
