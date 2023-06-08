import { FunctionComponent, ReactNode } from "react";
import classes from "./IOrderItem.module.css";
import { LabelBlock } from "@_types/admin/orders";

interface IOrderItemProps {
  storeName: string;
  customerName: string;
  orderDate: string;
  orderTime: string;
  labelBlocks: LabelBlock[];
  className?: string;
  extraContent?: ReactNode;
  onSelectedForPrint: () => void;
}

const IOrderItem: FunctionComponent<IOrderItemProps> = ({
  storeName,
  customerName,
  orderDate,
  orderTime,
  labelBlocks,
  className,
  extraContent,
  onSelectedForPrint,
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
          {labelBlocks.map((block) => {
            return (
              <div>
                <h2 className={classes.block_header}>{block.header.string}</h2>
                {block.breakdown.map((breakdown) => {
                  return (
                    <p className={classes.breakdown_string}>
                      {breakdown.string}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {extraContent}
      <input
        type="checkbox"
        className={classes.checkbox}
        onChange={onSelectedForPrint}
      />
    </div>
  );
};

export default IOrderItem;
