"use client";

import { FunctionComponent } from "react";
import classes from "./ItemCategory.module.css";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateModal from "./CreateModal";
import { DBEntity } from "@_types/admin/modify-menu";
import ModifyModal from "./ModifyModal";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";

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
  const { entities: categories, getUpdateEntityProps } =
    useUpdateEntities(initialCategories);
  return (
    <>
      <CreateModal
        modalProps={createModal.getModalProps()}
        categories={categories}
        addCategory={getUpdateEntityProps().addNewEntity}
      />

      <button onClick={createModal.handleModal}>Create Item Category</button>
      {categories.map((category, i) => {
        return (
          <p onClick={setSelectedEntity.bind(null, category, i)}>
            {category.name}
          </p>
        );
      })}
      <ModifyModal
        updateCategory={getUpdateEntityProps().updateEntity}
        index={getSelectedIndex()!}
        categories={categories}
        modalProps={modifyModal.getModalProps()}
        categoryName={getSelectedName()!}
        categoryId={getSelectedId()!}
      />
    </>
  );
};

export default ItemCategory;
