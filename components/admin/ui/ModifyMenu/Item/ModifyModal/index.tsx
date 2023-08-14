import { FunctionComponent } from "react";
import classes from "./index.module.css";
import ModalContents from "./ModalContents";
import {
  AvailableExtraGrouping,
  InitialItemSelections,
} from "@_types/admin/forms";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";

interface ModifyItemModalProps {
  id: number;
  groupings: DBEntity[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: NestedDBEntity[];
  modalProps: ModalProps;
  index: number;
  updateItem: UpdateEntity;
}

const ModifyItemModal: FunctionComponent<ModifyItemModalProps> = ({
  id,
  groupings,
  extraGroupings,
  itemCategories,
  modalProps,
  index,
  updateItem,
}) => {
  const { selections, isLoading } = useInitialSelections<InitialItemSelections>(
    id,
    "item"
  );
  return (
    <ModifyMenuModal modalProps={modalProps} isLoading={isLoading}>
      <ModalContents
        id={id}
        selections={selections}
        groupings={groupings}
        extraGroupings={extraGroupings}
        itemCategories={itemCategories}
        index={index}
        updateItem={updateItem}
        toggleModal={modalProps.handleModal}
      />
    </ModifyMenuModal>
  );
};

export default ModifyItemModal;
