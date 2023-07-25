"use client";

import { FunctionComponent } from "react";
import classes from "./ItemGrouping.module.css";
import { DBEntity, GroupingItem } from "@_types/admin/modify-menu";
import useUpdateEntities from "@_hooks/admin/menu/useUpdateEntities";
import useHandleInput from "@_hooks/admin/menu/useHandleInput";
import CreateModal from "./CreateModal";
import ModifyModal from "./ModifyModal";

interface ItemGroupingProps {
  customizations: GroupingItem[];
  groupings: DBEntity[];
}

const ItemGrouping: FunctionComponent<ItemGroupingProps> = ({
  customizations,
  groupings,
}) => {
  const {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  } = useHandleInput();
  const itemGroupings = useUpdateEntities(groupings);
  return (
    <>
      <CreateModal
        modalProps={createModal.getModalProps()}
        addNewGrouping={itemGroupings.getUpdateEntityProps().addNewEntity}
      />

      <button onClick={createModal.handleModal}>Create Grouping</button>
      {itemGroupings.entities.map((grouping, i) => {
        return (
          <div>
            <h2 onClick={setSelectedEntity.bind(null, grouping, i)}>
              {grouping.name}
            </h2>
          </div>
        );
      })}

      <ModifyModal
        modalProps={modifyModal.getModalProps()}
        groupingId={getSelectedId()!}
        groupingName={getSelectedName()!}
        index={getSelectedIndex()!}
        updateGrouping={itemGroupings.getUpdateEntityProps().updateEntity}
      />
    </>
  );
};

export default ItemGrouping;
