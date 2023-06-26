import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import { DBEntity, SubcategorySelections } from "@_types/admin/modify-menu";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import ModalContents from "./ModalContents";

interface ModifyModalProps {
  modalProps: ModalProps;
  subcategoryId: number;
  name: string;
  categories: DBEntity[];
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  subcategoryId,
  name,
  categories,
}) => {
  const { selections } = useInitialSelections<SubcategorySelections>(
    subcategoryId,
    "item-subcategory"
  );
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        name={name}
        itemSubcategoryId={subcategoryId}
        selections={selections}
        categories={categories}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
