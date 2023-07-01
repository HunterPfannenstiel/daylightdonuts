"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./ExtraCategory.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CreateExtraCategoryModal from "./CreateModal";
import {
  DBEntity,
  ExtraCategoryCustomizations,
} from "@_types/admin/modify-menu";
import ModifyModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";

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
          modalProps={createModal}
          existingExtras={customizations}
        />
      )}
      {categories.entities.map((category, i) => {
        return (
          <div>
            <p
              onClick={() => {
                setSelectedEntity(category, i);
              }}
            >
              {category.name}
            </p>
          </div>
        );
      })}
      {modifyModal.showModal && (
        <ModifyModal
          updateCategory={categories.updateEntity}
          modalProps={modifyModal}
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
