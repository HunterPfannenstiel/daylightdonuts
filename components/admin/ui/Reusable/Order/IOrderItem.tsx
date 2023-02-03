import { FunctionComponent, ReactNode } from "react";
import classes from "./IOrderItem.module.css";

interface IOrderItemProps {
  storeName: string;
  customerName: string;
  orderDate: string;
  orderTime: string;
  orderContents: string;
  className?: string;
  extraContent?: ReactNode;
}

const IOrderItem: FunctionComponent<IOrderItemProps> = ({
  storeName,
  customerName,
  orderDate,
  orderTime,
  orderContents,
  className,
  extraContent,
}) => {
  return (
    <div className={classes.order + " " + className}>
      <div className={classes.order_content}>
        <div className={classes.store}>
          <p>{storeName}</p>
        </div>
        <div className={classes.customer_details}>
          <p>Carry Out Order For:</p>
          <p>{customerName}</p>
          <p>{orderDate}</p>
          <p>{orderTime}</p>
        </div>
        <div className={classes.order_details}>
          <p>Order Details:</p>
          <p>Paid</p>
        </div>
        <div className={classes.order_info}>
          <p>Order:</p>
          <p className={classes.contents}>{orderContents}</p>
        </div>
      </div>
      {extraContent}
    </div>
  );
};

export default IOrderItem;
