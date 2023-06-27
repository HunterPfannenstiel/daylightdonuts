"use client";

import { FunctionComponent } from "react";
import classes from "./ItemCategory.module.css";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateModal from "./CreateModal";
import { DBEntity } from "@_types/admin/modify-menu";
import ModifyModal from "./ModifyModal";

interface ItemCategoryProps {
  categories: DBEntity[];
}

const ItemCategory: FunctionComponent<ItemCategoryProps> = ({ categories }) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    setSelectedEntity,
  } = useHandleInput();
  return (
    <>
      {createModal.showModal && (
        <CreateModal modalProps={createModal} categories={categories} />
      )}
      <button onClick={createModal.handleModal}>Create Item Category</button>
      {categories.map((category) => {
        return (
          <p onClick={setSelectedEntity.bind(null, category)}>
            {category.name}
          </p>
        );
      })}
      {modifyModal.showModal && (
        <ModifyModal
          categories={categories}
          modalProps={modifyModal}
          categoryName={getSelectedName()!}
          categoryId={getSelectedId()!}
        />
      )}
    </>
  );
};

export default ItemCategory;
