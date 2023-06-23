"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./ExtraGroup.module.css";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CreateExtraGroupModal from "./CreateModal";
import { CategoryExtra, DBEntity, ExtraGroup } from "@_types/admin/modify-menu";
import ModifyExtraGroupModal from "./ModifyModal";

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
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const selectedGroup = useRef<DBEntity>();
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
                <p
                  onClick={() => {
                    selectedGroup.current = group;
                    modifyModal.handleModal();
                  }}
                >
                  {group.name}
                </p>
              );
            })}
          </div>
        );
      })}
      {modifyModal.showModal && selectedGroup?.current?.id !== undefined && (
        <ModifyExtraGroupModal
          extras={extras}
          items={items}
          categories={categories}
          groupId={selectedGroup.current.id}
          modalProps={modifyModal}
          groupName={selectedGroup.current.name}
        />
      )}
    </>
  );
};

export default ExtraGroup;
