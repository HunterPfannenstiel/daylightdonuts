"use client";

import { FunctionComponent, useEffect, useRef } from "react";
import classes from "./Orders.module.css";
import OrderItemList from "../Orders/OrderItem/OrderItemList";
import { DBOrder } from "@_types/admin/orders";
import useSelectedOrders from "@_hooks/admin/orders/useSelectedOrders";
import Modal from "components/ui/Reusable/Modal/Modal";
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
  const {
    showModal: showDymo,
    playAnimation: animDymo,
    handleModal: handleDymo,
  } = useAnimateModal(300);
  const selectedOrderId = useRef<number>(0);
  const onLabelSelected = (orderId: number) => {
    selectedOrderId.current = orderId;
    handleDymo();
  };
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
        <ModalDisplay handleModal={handleModal} playAnimation={playAnimation}>
          {Object.keys(selectedOrders).map((key) => {
            const label = selectedOrders[+key];
            let image = `data:image/png;base64,${label.render()}`;
            return (
              <LabelPreview
                key={Math.random()}
                imageSrc={image}
                onClick={onLabelSelected.bind(null, +key)}
              />
            );
          })}
        </ModalDisplay>
      )}
      {showDymo && (
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
          handle={handleDymo}
          playAnimation={animDymo}
        />
      )}
    </>
  );
};

export default Orders;
