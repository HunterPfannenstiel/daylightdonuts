import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import { DBEntity, ExtraCategorySelections } from "@_types/admin/modify-menu";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface ModifyModalProps {
  extraCategoryId: number;
  categoryName: string;
  modalProps: ModalProps;
  existingExtras: DBEntity[];
  index: number;
  updateCategory: UpdateEntity;
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  extraCategoryId,
  categoryName,
  existingExtras,
  index,
  updateCategory,
}) => {
  const { selections } = useInitialSelections<ExtraCategorySelections>(
    extraCategoryId,
    "extra-category"
  );
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        index={index}
        updateCategory={updateCategory}
        handleModal={modalProps.handleModal}
        extraCategoryId={extraCategoryId}
        categoryName={categoryName}
        initialInfo={selections}
        existingExtras={existingExtras}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
