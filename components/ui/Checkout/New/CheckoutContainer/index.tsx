import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/client";

interface CheckoutContainerProps {
  children: ReactNode;
  header: string;
  footer?: ReactNode;
  className?: string;
  contentClass?: string;
}

const CheckoutContainer: FunctionComponent<CheckoutContainerProps> = ({
  children,
  header,
  footer,
  className,
  contentClass,
}) => {
  return (
    <div className={concatClassNames(classes.container, className)}>
      <div className={classes.header}>
        <h2>{header}</h2>
      </div>
      <div className={concatClassNames(classes.content, contentClass)}>
        {children}
      </div>
      {footer ? footer : null}
    </div>
  );
};

export default CheckoutContainer;
