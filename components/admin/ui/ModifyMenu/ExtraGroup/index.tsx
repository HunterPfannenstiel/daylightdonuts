"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./ExtraGroup.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CreateExtraGroupModal from "./CreateModal";
import { CategoryExtra, DBEntity, ExtraGroup } from "@_types/admin/modify-menu";
import ModifyExtraGroupModal from "./ModifyModal";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";

interface ExtraGroupProps {
  extras: CategoryExtra[];
  categories: DBEntity[];
  items: (DBEntity & { extra_group_ids: number[] })[];
  categoryGroups: ExtraGroup[];
}

const ExtraGroup: FunctionComponent<ExtraGroupProps> = ({
  extras,
  categories,
  items,
  categoryGroups,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    setSelectedEntity,
  } = useHandleInput();
  return (
    <>
      {createModal.showModal && (
        <CreateExtraGroupModal
          modalProps={createModal}
          extras={extras}
          categories={categories}
          items={items}
        />
      )}
      <button onClick={createModal.handleModal}>Create New Group</button>
      {categoryGroups.map((category) => {
        return (
          <div>
            <h2>{category.category}</h2>
            {category.groups.map((group) => {
              return (
                <p onClick={setSelectedEntity.bind(null, group)}>
                  {group.name}
                </p>
              );
            })}
          </div>
        );
      })}
      {modifyModal.showModal && (
        <ModifyExtraGroupModal
          extras={extras}
          items={items}
          categories={categories}
          groupId={getSelectedId()!}
          modalProps={modifyModal}
          groupName={getSelectedName()!}
        />
      )}
    </>
  );
};

export default ExtraGroup;
