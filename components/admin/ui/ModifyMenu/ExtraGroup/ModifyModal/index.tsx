import { FunctionComponent } from "react";
import classes from "./ModifyExtraGroupModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import {
  CategoryExtra,
  DBEntity,
  ExtraGroupSelections,
} from "@_types/admin/modify-menu";
import ModalContents from "./ModalContents";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";

interface ModifyExtraGroupModalProps {
  modalProps: ModalProps;
  groupName: string;
  groupId: number;
  extras: CategoryExtra[];
  categories: DBEntity[];
  items: DBEntity[];
}

const ModifyExtraGroupModal: FunctionComponent<ModifyExtraGroupModalProps> = ({
  modalProps,
  groupName,
  groupId,
  extras,
  categories,
  items,
}) => {
  const { selections, isLoading } = useInitialSelections<ExtraGroupSelections>(
    groupId,
    "extra-group"
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        groupId={groupId}
        groupName={groupName}
        extras={extras}
        categories={categories}
        items={items}
        selections={selections!}
      />
    </ModifyMenuModal>
  );
};

export default ModifyExtraGroupModal;
