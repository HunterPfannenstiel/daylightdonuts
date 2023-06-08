"use client";

import { FunctionComponent, useEffect, useRef } from "react";
import classes from "./Orders.module.css";
import OrderItemList from "../Orders/OrderItem/OrderItemList";
import { DBOrder } from "@_types/admin/orders";
import useSelectedOrders from "@_hooks/admin/orders/useSelectedOrders";
import Modal from "components/ui/Reusable/Modal/Modal";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { getLabel } from "@_utils/dymo/format";
import LabelPreview from "../Orders/OrderDetails/LabelPreview";

interface OrdersProps {
  orders: DBOrder[];
}

const Orders: FunctionComponent<OrdersProps> = ({ orders }) => {
  const { updateSelectedOrder, getLabelsToPrint, selectedCount } =
    useSelectedOrders();
  const { showModal, handleModal } = useAnimateModal(300);
  const labelXml = useRef<any[]>([]);
  useEffect(() => {
    if (window.dymo) window.dymo.label.framework.init();
  }, [window?.dymo]);

  return (
    <>
      {selectedCount && (
        <button
          onClick={handleModal}
        >{`View Orders (${selectedCount})`}</button>
      )}
      <OrderItemList orders={orders} onSelectedForPrint={updateSelectedOrder} />
      {showModal && (
        <Modal selector="modal">
          <div className={classes.modal}>
            {getLabelsToPrint().map((order, i) => {
              const label = getLabel(
                order.details.storeName,
                order.details.customerName,
                order.details.date,
                order.details.time,
                order.labelBlocks,
                order.details.detailMessage
              );
              labelXml.current.push(label);
              return (
                <LabelPreview
                  key={i}
                  imageSrc={`data:image/png;base64,${label.render()}`}
                />
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Orders;
