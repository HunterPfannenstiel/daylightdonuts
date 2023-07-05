import { Item } from "@_types/database/menu";
import IItemPage from "components/ui/Reusable/Item/ItemPage";
import Modal from "components/ui/Reusable/Modal/Modal";
import { FunctionComponent } from "react";
import DozenableItemForm from "../DozenableItems/DozenableItemForm";
import classes from "./ItemModal.module.css";

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
      <Modal selector="#modal">
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
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default ItemModal;
