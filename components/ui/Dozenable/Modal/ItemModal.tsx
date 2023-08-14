import { Item } from "@_types/database/menu";
import IItemPage from "components/ui/Reusable/Item/ItemPage";
import { FunctionComponent } from "react";
import classes from "./ItemModal.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ExtraInfo } from "@_types/database/cart";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

export interface ItemModalProps {
  item: Item;
  modalProps: ModalProps;
  showModal: boolean;
  maxAmount: number;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
  addItemToBox: (amount: number) => void;
}

const ItemModal: FunctionComponent<ItemModalProps> = ({
  item,
  modalProps,
  showModal,
  maxAmount,
  updateExtras,
  addItemToBox,
}) => {
  if (showModal) {
    const animate = modalProps.playAnimation ? classes.animate_out : "";
    return (
      <ModalDisplay
        handleModal={modalProps.handleModal}
        playAnimation={modalProps.playAnimation}
        animationTime={300}
      >
        <div className={classes.content}>
          <IItemPage
            item={item}
            extraPrice={0}
            price={+item.price}
            maxAmount={maxAmount}
            className={classes.page}
            backButtonHandler={modalProps.handleModal}
            updateExtras={updateExtras}
            addItemToCart={addItemToBox}
          />
        </div>
      </ModalDisplay>
    );
  } else {
    return <></>;
  }
};

export default ItemModal;
