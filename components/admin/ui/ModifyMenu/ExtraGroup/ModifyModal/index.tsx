import { FunctionComponent } from "react";
import classes from "./ModifyExtraGroupModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import {
  CategoryExtra,
  DBEntity,
  ExtraGroupSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import ModalContents from "./ModalContents";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import {
  AddNewNestedEntity,
  DeleteNestedEntity,
  NestedEntityFunctions,
  UpdateNestedEntity,
} from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ModifyExtraGroupModalProps {
  modalProps: ModalProps;
  groupName: string;
  groupId: number;
  extras: NestedDBEntity[];
  items: DBEntity[];
  index: number;
  entityFns: NestedEntityFunctions;
}

const ModifyExtraGroupModal: FunctionComponent<ModifyExtraGroupModalProps> = ({
  modalProps,
  groupName,
  groupId,
  extras,
  items,
  index,
  entityFns,
}) => {
  const { selections, isLoading } = useInitialSelections<ExtraGroupSelections>(
    groupId,
    "extra-group"
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        index={index}
        entityFns={entityFns}
        handleModal={modalProps.handleModal}
        groupId={groupId}
        groupName={groupName}
        extras={extras}
        items={items}
        selections={selections!}
      />
    </ModifyMenuModal>
  );
};

export default ModifyExtraGroupModal;
