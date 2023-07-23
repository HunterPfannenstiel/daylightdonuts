"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./Orders.module.css";
import OrderItemList from "../Orders/OrderItem/OrderItemList";
import { DBOrder } from "@_types/admin/orders";
import useSelectedOrders from "@_hooks/admin/orders/useSelectedOrders";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import LabelPreview from "../Orders/OrderDetails/LabelPreview";
import DymoDisplay from "./DymoDisplay/DymoDisplay";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";

interface OrdersProps {
  orders: DBOrder[];
}

const Orders: FunctionComponent<OrdersProps> = ({ orders }) => {
  const {
    selectedOrders,
    updateSelectedOrder,
    selectedCount,
    onTextChange,
    selectedOrderInfo,
  } = useSelectedOrders();
  const { showModal, handleModal, playAnimation } = useAnimateModal(300);
  const dymoModal = useAnimateModal(300);
  const selectedOrderId = useRef<number>(0);
  const onLabelSelected = (orderId: number) => {
    selectedOrderId.current = orderId;
    dymoModal.handleModal();
  };
  const initDymo = async () => {
    try {
      window.dymo.label.framework.init();
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      {selectedCount && (
        <button
          onClick={handleModal}
        >{`View Orders (${selectedCount})`}</button>
      )}
      <OrderItemList orders={orders} onSelectedForPrint={updateSelectedOrder} />
      <ModalDisplay {...dymoModal.getModalProps()} className={classes.orders}>
        {Object.keys(selectedOrders).map((key) => {
          const label = selectedOrders[+key];
          let image = `data:image/png;base64,${label.render()}`;
          return (
            <li key={Math.random()}>
              <LabelPreview
                imageSrc={image}
                onClick={onLabelSelected.bind(null, +key)}
              />
              <button
                onClick={() => {
                  updateSelectedOrder(+key);
                }}
              >
                Remove Label
              </button>
            </li>
          );
        })}
      </ModalDisplay>

      <DymoDisplay
        orderId={selectedOrderId.current}
        abbreviate={
          selectedOrderInfo.current[selectedOrderId.current].abbreviate
        }
        showCategoryNames={
          selectedOrderInfo.current[selectedOrderId.current].showCategoryNames
        }
        labelImage={`data:image/png;base64,${selectedOrders[
          selectedOrderId.current
        ].render()}`}
        onTextStyleChange={onTextChange}
        modalProps={dymoModal.getModalProps()}
      />
    </>
  );
};

export default Orders;
