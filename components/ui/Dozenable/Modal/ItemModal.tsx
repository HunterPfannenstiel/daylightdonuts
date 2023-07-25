import { Item } from "@_types/database/menu";
import IItemPage from "components/ui/Reusable/Item/ItemPage";
import Modal from "components/ui/Reusable/Modal/Modal";
import { FunctionComponent } from "react";
import DozenableItemForm from "../DozenableItems/DozenableItemForm";
import classes from "./ItemModal.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";

interface ItemModalProps {
  item: Item;
  displayModal: boolean;
  playAnimation: boolean;
  handleModal: () => void;
}

const ItemModal: FunctionComponent<ItemModalProps> = ({
  item,
  displayModal,
  playAnimation,
  handleModal,
}) => {
  if (displayModal) {
    const animate = playAnimation ? classes.animate_out : "";
    return (
      <ModalDisplay
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={300}
      >
        <div className={classes.modal + " " + animate}>
          <IItemPage
            item={item}
            extraPrice={0}
            price={+item.price}
            itemForm={<DozenableItemForm item={item} />}
            className={classes.page}
            backButtonHandler={handleModal}
          />
          <div className={classes.background} onClick={handleModal} />
        </div>
      </ModalDisplay>
    );
  } else {
    return <></>;
  }
};

export default ItemModal;
