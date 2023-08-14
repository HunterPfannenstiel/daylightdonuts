"use client";

import { FunctionComponent } from "react";
import classes from "./ItemCategory.module.css";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateModal from "./CreateModal";
import { DBEntity } from "@_types/admin/modify-menu";
import ModifyModal from "./ModifyModal";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";
import EntityDisplay from "@_admin-reuse/Modify/EntityDisplay";

interface ItemCategoryProps {
  initialCategories: DBEntity[];
}

const ItemCategory: FunctionComponent<ItemCategoryProps> = ({
  initialCategories,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  } = useHandleInput();
  const categories = useUpdateEntities(initialCategories);
  return (
    <>
      <CreateModal
        modalProps={createModal.getModalProps()}
        categories={categories.entities}
        addCategory={categories.getUpdateEntityProps().addNewEntity}
      />

      <button onClick={createModal.handleModal}>Create Item Category</button>
      <EntityDisplay
        entities={categories.entities}
        setSelectedEntity={setSelectedEntity}
      />
      <ModifyModal
        updateCategory={categories.getUpdateEntityProps().updateEntity}
        index={getSelectedIndex()!}
        categories={categories.entities}
        modalProps={modifyModal.getModalProps()}
        categoryName={getSelectedName()!}
        categoryId={getSelectedId()!}
      />
    </>
  );
};

export default ItemCategory;
