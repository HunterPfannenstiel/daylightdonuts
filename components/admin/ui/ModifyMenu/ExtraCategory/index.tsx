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

interface ExtraCategoryProps {
  customizations: ExtraCategoryCustomizations;
  categories: DBEntity[];
}

const ExtraCategory: FunctionComponent<ExtraCategoryProps> = ({
  customizations,
  categories,
}) => {
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const selectedCategory = useRef<DBEntity>();
  return (
    <>
      <button onClick={createModal.handleModal}>Create Category</button>
      {createModal.showModal && (
        <CreateExtraCategoryModal
          modalProps={createModal}
          existingExtras={customizations}
        />
      )}
      {categories.map((category) => {
        return (
          <div>
            <p
              onClick={() => {
                selectedCategory.current = category;
                modifyModal.handleModal();
              }}
            >
              {category.name}
            </p>
          </div>
        );
      })}
      {modifyModal.showModal && (
        <ModifyModal
          modalProps={modifyModal}
          extraCategoryId={selectedCategory.current!.id}
          categoryName={selectedCategory.current!.name}
          existingExtras={customizations}
        />
      )}
    </>
  );
};

export default ExtraCategory;
