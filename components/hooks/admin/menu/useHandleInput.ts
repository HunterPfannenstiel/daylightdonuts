import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { DBEntity } from "@_types/admin/modify-menu";
import { useRef } from "react";

const useHandleInput = () => {
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const selectedEntity = useRef<DBEntity & { index: number }>();

  const setSelectedEntity = (entity: DBEntity, index: number) => {
    selectedEntity.current = { ...entity, index };
    modifyModal.handleModal();
  };

  const getSelectedId = () => selectedEntity.current?.id;

  const getSelectedName = () => selectedEntity.current?.name;

  const getSelectedIndex = () => selectedEntity.current?.index;

  return {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    getSelectedIndex,
    setSelectedEntity,
  };
};

export default useHandleInput;
