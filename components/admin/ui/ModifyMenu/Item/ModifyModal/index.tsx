import { FunctionComponent } from "react";
import classes from "./index.module.css";
import useItemSelections from "@_hooks/admin/menu/item/useItemSelections";
import ModalContents from "./ModalContents";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface ModifyItemModalProps {
  id: number;
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
  modalProps: ModalProps;
}

const ModifyItemModal: FunctionComponent<ModifyItemModalProps> = ({
  id,
  groupings,
  extraGroupings,
  itemCategories,
  modalProps,
}) => {
  const { selections } = useItemSelections(id);
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        id={id}
        selections={selections}
        groupings={groupings}
        extraGroupings={extraGroupings}
        itemCategories={itemCategories}
      />
    </ModifyMenuModal>
  );
};

export default ModifyItemModal;
