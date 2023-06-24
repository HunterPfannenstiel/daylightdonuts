"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./ExtraCategory.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CreateExtraCategoryModal from "./CreateModal";
import {
  DBEntity,
  ExtraCategoryCustomizations,
} from "@_types/admin/modify-menu";

interface ExtraCategoryProps {
  customizations: ExtraCategoryCustomizations;
  categories: DBEntity[];
}

const ExtraCategory: FunctionComponent<ExtraCategoryProps> = ({
  customizations,
  categories,
}) => {
  const createModal = useAnimateModal(300);
  const selectedCategory = useRef<{ name: string; id: string }>();
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
            <p>{category.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default ExtraCategory;
