"use client";

import { FunctionComponent } from "react";
import classes from "./ItemSubcategory.module.css";
import { DBEntity, SubcategoryCustomizations } from "@_types/admin/modify-menu";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateSubcategoryModal from "./CreateModal";
import ModifyModal from "./ModifyModal";

interface ItemSubcategoryProps {
  customizations: SubcategoryCustomizations;
  subcategories: DBEntity[];
}

const ItemSubcategory: FunctionComponent<ItemSubcategoryProps> = ({
  customizations,
  subcategories,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    setSelectedEntity,
  } = useHandleInput();
  return (
    <>
      <CreateSubcategoryModal
        modalProps={createModal.getModalProps()}
        categories={customizations.categories}
      />
      <button onClick={createModal.handleModal}>Create Subcategory</button>
      {subcategories.map((subcategory, i) => {
        return (
          <p onClick={setSelectedEntity.bind(null, subcategory, i)}>
            {subcategory.name}
          </p>
        );
      })}
      <ModifyModal
        modalProps={modifyModal.getModalProps()}
        subcategoryId={getSelectedId()!}
        name={getSelectedName()!}
        categories={customizations.categories}
      />
    </>
  );
};

export default ItemSubcategory;
