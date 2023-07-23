"use client";

import { FunctionComponent } from "react";
import classes from "./ExtraGroup.module.css";
import CreateExtraGroupModal from "./CreateModal";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";
import ModifyExtraGroupModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import useUpdateNestedEntities from "@_hooks/admin/menu/useUpdateNestedEntities";

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
        addNewGroup={extraGroups.getUpdateEntityProps().addNewEntity}
        modalProps={createModal.getModalProps()}
        extras={extras}
        items={items}
      />

      <button onClick={createModal.handleModal}>Create New Group</button>
      {extraGroups.entities.map((category) => {
        return (
          <div>
            <h2>{category.name}</h2>
            {category.entities.map((group, i) => {
              return (
                <p onClick={setSelectedEntity.bind(null, group, i)}>
                  {group.name}
                </p>
              );
            })}
          </div>
        );
      })}
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
