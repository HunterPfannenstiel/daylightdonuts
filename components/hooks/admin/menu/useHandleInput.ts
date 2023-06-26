import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { DBEntity } from "@_types/admin/modify-menu";
import { useRef } from "react";

const useHandleInput = () => {
  const createModal = useAnimateModal(300);
  const modifyModal = useAnimateModal(300);
  const selectedEntity = useRef<DBEntity>();

  const setSelectedEntity = (entity: DBEntity) => {
    selectedEntity.current = entity;
    modifyModal.handleModal();
  };

  const getSelectedId = () => selectedEntity.current?.id;

  const getSelectedName = () => selectedEntity.current?.name;

  return {
    createModal,
    modifyModal,
    getSelectedId,
    getSelectedName,
    setSelectedEntity,
  };
};

export default useHandleInput;
