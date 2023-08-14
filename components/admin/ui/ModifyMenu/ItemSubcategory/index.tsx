"use client";

import { FunctionComponent } from "react";
import classes from "./ItemSubcategory.module.css";
import { DBEntity, SubcategoryCustomizations } from "@_types/admin/modify-menu";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateSubcategoryModal from "./CreateModal";
import ModifyModal from "./ModifyModal";
import EntityDisplay from "@_admin-reuse/Modify/EntityDisplay";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";

interface ItemSubcategoryProps {
  customizations: SubcategoryCustomizations;
  initialSubcategories: DBEntity[];
}

const ItemSubcategory: FunctionComponent<ItemSubcategoryProps> = ({
  customizations,
  initialSubcategories,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  } = useHandleInput();
  const subcategories = useUpdateEntities(initialSubcategories);
  return (
    <>
      {createModal.showModal && (
        <CreateSubcategoryModal
          modalProps={createModal.getModalProps()}
          categories={customizations.categories}
          addNewSubcategory={subcategories.addNewEntity}
        />
      )}
      <button onClick={createModal.handleModal}>Create Subcategory</button>
      <EntityDisplay
        entities={subcategories.entities}
        setSelectedEntity={setSelectedEntity}
      />
      {modifyModal.showModal && (
        <ModifyModal
          modalProps={modifyModal.getModalProps()}
          subcategoryId={getSelectedId()!}
          name={getSelectedName()!}
          categories={customizations.categories}
          index={getSelectedIndex()!}
          updateSubcategory={subcategories.updateEntity}
        />
      )}
    </>
  );
};

export default ItemSubcategory;
