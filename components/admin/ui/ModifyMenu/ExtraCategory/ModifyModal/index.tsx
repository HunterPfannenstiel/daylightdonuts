import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import useExtraCategorySelections from "@_hooks/admin/menu/extra-category/useExtraCategorySelections";
import { DBEntity } from "@_types/admin/modify-menu";

interface ModifyModalProps {
  extraCategoryId: number;
  categoryName: string;
  modalProps: ModalProps;
  existingExtras: DBEntity[];
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  extraCategoryId,
  categoryName,
  existingExtras,
}) => {
  const selections = useExtraCategorySelections(extraCategoryId);
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        extraCategoryId={extraCategoryId}
        categoryName={categoryName}
        initialInfo={selections}
        existingExtras={existingExtras}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
