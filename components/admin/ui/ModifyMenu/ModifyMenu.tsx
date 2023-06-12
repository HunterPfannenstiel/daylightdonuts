"use client";

import { FunctionComponent, useState } from "react";
import classes from "./ModifyMenu.module.css";
import CreateItemModal from "./CreateItemModal/CreateItemModal";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";
import { Item } from "@_types/admin/modify-menu";
import ModifyItemModal from "./ModifyItemModal";
import useAnimateModal from "@_hooks/animation/useAnimateModal";

interface ModifyMenuProps {
  items: Item[];
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = ({
  items,
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  const [selectedId, setSelectedId] = useState<number>();
  const { handleModal, playAnimation, showModal } = useAnimateModal(300);
  const openModal = (id: number) => {
    setSelectedId(id);
    handleModal();
  };
  const closeModal = () => {
    setSelectedId(undefined);
    handleModal();
  };
  return (
    <>
      <ul className={classes.menu_items}>
        {items.map((item) => {
          return (
            <li key={item.name}>
              <h2>{item.name}</h2>
              <button onClick={openModal.bind(null, item.menu_item_id)}>
                Modify
              </button>
            </li>
          );
        })}
      </ul>
      {showModal && selectedId && (
        <ModifyItemModal
          playAnimation={playAnimation}
          closeModal={closeModal}
          id={selectedId!}
          groupings={groupings}
          extraGroupings={extraGroupings}
          itemCategories={itemCategories}
        />
      )}
    </>
  );
  // return (
  //   <CreateItemModal
  //     groupings={groupings}
  //     extraGroupings={extraGroupings}
  //     itemCategories={itemCategories}
  //   />
  // );
};

export default ModifyMenu;
