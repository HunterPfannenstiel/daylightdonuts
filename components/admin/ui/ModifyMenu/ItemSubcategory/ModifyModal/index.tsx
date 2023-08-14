import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import { DBEntity, SubcategorySelections } from "@_types/admin/modify-menu";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import ModalContents from "./ModalContents";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface ModifyModalProps {
  modalProps: ModalProps;
  subcategoryId: number;
  name: string;
  categories: DBEntity[];
  index: number;
  updateSubcategory: UpdateEntity;
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  subcategoryId,
  name,
  categories,
  index,
  updateSubcategory,
}) => {
  const { selections, isLoading } = useInitialSelections<SubcategorySelections>(
    subcategoryId,
    "item-subcategory"
  );
  return (
    <ModifyMenuModal modalProps={modalProps} isLoading={isLoading}>
      <ModalContents
        name={name}
        itemSubcategoryId={subcategoryId}
        selections={selections}
        categories={categories}
        index={index}
        updateSubcategory={updateSubcategory}
        handleModal={modalProps.handleModal}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
