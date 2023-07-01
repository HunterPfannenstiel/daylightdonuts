"use client";

import { FunctionComponent } from "react";
import classes from "./ExtraGroup.module.css";
import CreateExtraGroupModal from "./CreateModal";
import {
  CategoryExtra,
  DBEntity,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
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
      {createModal.showModal && (
        <CreateExtraGroupModal
          addNewGroup={extraGroups.addNewEntity}
          modalProps={createModal}
          extras={extras}
          items={items}
        />
      )}
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
      {modifyModal.showModal && (
        <ModifyExtraGroupModal
          index={getSelectedIndex()!}
          entityFns={{
            addNewEntity: extraGroups.addNewEntity,
            updateEntity: extraGroups.updateEntity,
            deleteEntity: extraGroups.deleteEntity,
          }}
          extras={extras}
          items={items}
          groupId={getSelectedId()!}
          modalProps={modifyModal}
          groupName={getSelectedName()!}
        />
      )}
    </>
  );
};

export default ExtraGroup;
