import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { DBOrder, LabelBlock, OrderLabelDetails } from "@_types/admin/orders";
import { getOrderContentString } from "@_utils/orders";
import { FunctionComponent, useRef, useState } from "react";
import IOrderItem from "../../Reusable/Order/IOrderItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import HandleOrder from "./HandleOrder";
import classes from "./OrderItem.module.css";
import { buildLabelBlocks } from "@_utils/dymo/format";

interface OrderItemProps {
  order: DBOrder;
  onSelectedForPrint: (
    id: number,
    details?: OrderLabelDetails,
    labelBlocks?: LabelBlock[]
  ) => void;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({
  order,
  onSelectedForPrint,
}) => {
  const { playAnimation, showModal, handleModal } = useAnimateModal(300);
  const selectedForPrint = useRef<boolean>(false);
  const [labelBlocks, setLabelBlocks] = useState(
    buildLabelBlocks(order.order_contents, false, false)
  );

  const updateLabelBlocks = (blocks: LabelBlock[]) => {
    if (selectedForPrint.current)
      onSelectedForPrint(order.order_id, undefined, blocks);
    setLabelBlocks(blocks);
  };

  const onSelectedChange = () => {
    selectedForPrint.current = !selectedForPrint.current;
    if (selectedForPrint.current)
      onSelectedForPrint(
        order.order_id,
        {
          storeName: order.location,
          customerName: order.customer_info.name,
          date: order.pickup_date,
          time: order.pickup_time,
        },
        labelBlocks
      );
    else onSelectedForPrint(order.order_id);
  };
  return (
    <div>
      <IOrderItem
        className={classes.order}
        storeName={order.location}
        customerName={order.customer_info.name}
        orderDate={order.pickup_date}
        orderTime={order.pickup_time}
        labelBlocks={labelBlocks}
        extraContent={
          <HandleOrder
            onClick={handleModal}
            onPrintClick={() => {
              console.log("Print");
            }}
          />
        }
        onSelectedForPrint={onSelectedChange}
      />
      {showModal && (
        <OrderDetails
          order={order}
          handleModal={handleModal}
          playAnimation={playAnimation}
          animationTime={300}
          labelBlocks={labelBlocks}
        />
      )}
    </div>
  );
};

export default OrderItem;
