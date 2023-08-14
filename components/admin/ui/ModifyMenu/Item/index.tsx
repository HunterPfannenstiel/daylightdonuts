"use client";

import { FunctionComponent } from "react";
import { AvailableExtraGrouping } from "@_types/admin/forms";
import { DBEntity, Item, NestedDBEntity } from "@_types/admin/modify-menu";
import ModifyItemModal from "./ModifyModal";
import CreateItemModal from "./CreateModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";
import EntityDisplay from "@_admin-reuse/Modify/EntityDisplay";

interface ModifyMenuProps {
  initialItems: Item[];
  groupings: DBEntity[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: NestedDBEntity[];
}

const ModifyMenu: FunctionComponent<ModifyMenuProps> = ({
  initialItems,
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  } = useHandleInput();
  const items = useUpdateEntities(initialItems);
  return (
    <>
      {createModal.showModal && (
        <CreateItemModal
          addNewItem={items.addNewEntity}
          modalProps={createModal.getModalProps()}
          groupings={groupings}
          extraGroupings={extraGroupings}
          itemCategories={itemCategories}
        />
      )}
      <EntityDisplay
        entities={items.entities}
        entityCategory="Item"
        setSelectedEntity={setSelectedEntity}
        createNewHandler={createModal.handleModal}
      />
      {modifyModal.showModal && (
        <ModifyItemModal
          modalProps={modifyModal.getModalProps()}
          groupings={groupings}
          extraGroupings={extraGroupings}
          itemCategories={itemCategories}
          updateItem={items.updateEntity}
          id={getSelectedId()!}
          index={getSelectedIndex()!}
        />
      )}
    </>
  );
};

export default ModifyMenu;
