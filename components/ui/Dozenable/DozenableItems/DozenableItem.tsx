import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { Item } from "@_types/database/menu";
import { FunctionComponent } from "react";
import IItem from "../../Reusable/Menu/Item";
import ItemModal from "../Modal/ItemModal";
import classes from "./DozenableItem.module.css";

interface DozenableItemProps {
  item: Item;
}

const DozenableItem: FunctionComponent<DozenableItemProps> = ({ item }) => {
  const { showModal, playAnimation, handleModal } = useAnimateModal(300);
  const button = (
    <button className={classes.button} onClick={handleModal}>
      Customize
    </button>
  );
  return (
    <>
      <IItem item={item} button={button} />
      <ItemModal
        item={item}
        displayModal={showModal}
        playAnimation={!!playAnimation}
        handleModal={handleModal}
      />
    </>
  );
};

export default DozenableItem;
