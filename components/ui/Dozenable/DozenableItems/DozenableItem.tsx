import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { FunctionComponent } from "react";
import IItem from "../../Reusable/Menu/Item";
import ItemModal, { ItemModalProps } from "../Modal/ItemModal";
import classes from "./DozenableItem.module.css";

interface DozenableItemProps
  extends Omit<ItemModalProps, "modalProps" | "showModal"> {}

const DozenableItem: FunctionComponent<DozenableItemProps> = ({
  item,
  maxAmount,
  updateExtras,
  addItemToBox,
}) => {
  const { handleModal, getModalProps, showModal } = useAnimateModal(300);
  const button = (
    <button className={classes.button} onClick={handleModal}>
      Customize
    </button>
  );
  return (
    <>
      <IItem
        item={{
          ...item,
          availableDays: item.available_days,
          availableRange: item.available_range,
          image_url: item.image_urls[0],
        }}
        button={button}
      />
      <ItemModal
        item={item}
        modalProps={getModalProps()}
        showModal={showModal}
        updateExtras={updateExtras}
        maxAmount={maxAmount}
        addItemToBox={addItemToBox}
      />
    </>
  );
};

export default DozenableItem;
