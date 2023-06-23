import { FunctionComponent } from "react";
import classes from "./ModifyExtraGroupModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { CategoryExtra, DBEntity } from "@_types/admin/modify-menu";
import ModalContents from "./ModalContents";
import useExtraGroupSelections from "@_hooks/admin/menu/extra-group/useExtraGroupSelections";
import { ModifyExtraGroup } from "@_utils/database/admin/menu-queries/extras";

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
  const { selections, isLoading } = useExtraGroupSelections(groupId);
  const onSubmit = async () => {
    const extraGroup = {} as ModifyExtraGroup;
    console.log("submit");
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        groupName={groupName}
        extras={extras}
        categories={categories}
        items={items}
        selections={selections!}
      />
      <button onClick={onSubmit}>Submit</button>
    </ModifyMenuModal>
  );
};

export default ModifyExtraGroupModal;
