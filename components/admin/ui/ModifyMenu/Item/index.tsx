"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";
import { Item } from "@_types/admin/modify-menu";
import ModifyItemModal from "./ModifyModal";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CreateItemModal from "./CreateModal";

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
  const selectedId = useRef<number>();
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const openModifyModal = (id: number) => {
    selectedId.current = id;
    modifyModal.handleModal();
  };
  return (
    <>
      <CreateItemModal
        modalProps={createModal.getModalProps()}
        groupings={groupings}
        extraGroupings={extraGroupings}
        itemCategories={itemCategories}
      />
      <ul className={classes.menu_items}>
        {items.map((item) => {
          return (
            <li key={item.name}>
              <h2>{item.name}</h2>
              <button onClick={openModifyModal.bind(null, item.menu_item_id)}>
                Modify
              </button>
            </li>
          );
        })}
      </ul>
      <ModifyItemModal
        modalProps={modifyModal.getModalProps()}
        id={selectedId.current!}
        groupings={groupings}
        extraGroupings={extraGroupings}
        itemCategories={itemCategories}
      />
    </>
  );
};

export default ModifyMenu;
