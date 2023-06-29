import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import { CategorySelections, DBEntity } from "@_types/admin/modify-menu";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";

interface ModifyModalProps {
  modalProps: ModalProps;
  categories: DBEntity[];
  categoryName: string;
  categoryId: number;
  index: number;
  updateCategory: (name: string, index: number) => void;
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  categories,
  categoryName,
  categoryId,
  index,
  updateCategory,
}) => {
  const { selections } = useInitialSelections<CategorySelections>(
    categoryId,
    "item-category"
  );
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        toggleModal={modalProps.handleModal}
        updateCategory={updateCategory}
        categories={categories}
        categoryName={categoryName}
        categoryId={categoryId}
        selections={selections}
        index={index}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
