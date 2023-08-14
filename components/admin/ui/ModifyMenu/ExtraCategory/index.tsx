"use client";

import { FunctionComponent } from "react";
import CreateExtraCategoryModal from "./CreateModal";
import {
  DBEntity,
  ExtraCategoryCustomizations,
} from "@_types/admin/modify-menu";
import ModifyModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";
import EntityDisplay from "@_admin-reuse/Modify/EntityDisplay";

interface ExtraCategoryProps {
  customizations: ExtraCategoryCustomizations;
  initialCategories: DBEntity[];
}

const ExtraCategory: FunctionComponent<ExtraCategoryProps> = ({
  customizations,
  initialCategories,
}) => {
  const {
    createModal,
    modifyModal,
    setSelectedEntity,
    getSelectedId,
    getSelectedIndex,
    getSelectedName,
  } = useHandleInput();
  const categories = useUpdateEntities(initialCategories);
  return (
    <>
      <button onClick={createModal.handleModal}>Create Category</button>

      {createModal.showModal && (
        <CreateExtraCategoryModal
          addNewCategory={categories.addNewEntity}
          modalProps={createModal.getModalProps()}
          existingExtras={customizations}
        />
      )}
      <EntityDisplay
        entities={categories.entities}
        setSelectedEntity={setSelectedEntity}
      />
      {modifyModal.showModal && (
        <ModifyModal
          updateCategory={categories.updateEntity}
          modalProps={modifyModal.getModalProps()}
          extraCategoryId={getSelectedId()!}
          categoryName={getSelectedName()!}
          index={getSelectedIndex()!}
          existingExtras={customizations}
        />
      )}
    </>
  );
};

export default ExtraCategory;
