import { FunctionComponent } from "react";
import classes from "./ModifyModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";
import ModalContents from "./ModalContents";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { GroupingSelections } from "@_types/admin/modify-menu";

interface ModifyModalProps {
  modalProps: ModalProps;
  groupingId: number;
  groupingName: string;
  index: number;
  updateGrouping: UpdateEntity;
}

const ModifyModal: FunctionComponent<ModifyModalProps> = ({
  modalProps,
  groupingId,
  groupingName,
  index,
  updateGrouping,
}) => {
  const { selections } = useInitialSelections<GroupingSelections>(
    groupingId,
    "item-grouping"
  );
  if (!selections) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        groupingId={groupingId}
        groupingName={groupingName}
        handleModal={modalProps.handleModal}
        index={index}
        updateGrouping={updateGrouping}
        selections={selections}
      />
    </ModifyMenuModal>
  );
};

export default ModifyModal;
