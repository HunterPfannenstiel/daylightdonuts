"use client";

import { FunctionComponent } from "react";
import classes from "./ExtraGroup.module.css";
import CreateExtraGroupModal from "./CreateModal";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";
import ModifyExtraGroupModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateNestedEntities from "@_hooks/admin/menu/useUpdateNestedEntities";
import NestedEntityDisplay from "@_admin-reuse/Modify/EntityDisplay/NestedEntityDisplay";

interface ExtraGroupProps {
  extras: NestedDBEntity[];
  items: (DBEntity & { extra_group_ids: number[] })[];
  initialGroups: NestedDBEntity[];
}

const ExtraGroup: FunctionComponent<ExtraGroupProps> = ({
  extras,
  items,
  initialGroups,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  } = useHandleInput();
  const extraGroups = useUpdateNestedEntities(initialGroups);
  return (
    <>
      <CreateExtraGroupModal
        addNewGroup={extraGroups.addNewEntity}
        modalProps={createModal.getModalProps()}
        extras={extras}
        items={items}
      />
      <button onClick={createModal.handleModal}>Create New Group</button>
      <NestedEntityDisplay
        entities={extraGroups.entities}
        setSelectedEntity={setSelectedEntity}
      />
      <ModifyExtraGroupModal
        index={getSelectedIndex()!}
        entityFns={extraGroups.getUpdateEntityProps()}
        extras={extras}
        items={items}
        groupId={getSelectedId()!}
        modalProps={modifyModal.getModalProps()}
        groupName={getSelectedName()!}
      />
    </>
  );
};

export default ExtraGroup;
