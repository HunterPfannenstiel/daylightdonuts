import { FunctionComponent } from "react";
import classes from "./index.module.css";
import useItemSelections from "@_hooks/admin/menu/useItemSelections";
import ModalContents from "./ModalContents";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
} from "@_types/admin/forms";
import Modal from "components/ui/Reusable/Modal/Modal";
import Background from "components/ui/Reusable/Modal/Background";

interface ModifyItemModalProps {
  id: number;
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
  closeModal: () => void;
  playAnimation: boolean;
}

const ModifyItemModal: FunctionComponent<ModifyItemModalProps> = ({
  id,
  groupings,
  extraGroupings,
  itemCategories,
  closeModal,
  playAnimation,
}) => {
  const { selections } = useItemSelections(id);
  if (!selections) return <p>Loading...</p>;
  return (
    <Modal selector="modal">
      <div className={classes.modal}>
        <p onClick={closeModal}>X</p>
        <ModalContents
          id={id}
          selections={selections}
          groupings={groupings}
          extraGroupings={extraGroupings}
          itemCategories={itemCategories}
        />
      </div>
      <Background
        backgroundColor="var(--primary-blue)"
        handleModal={closeModal}
        playAnimation={playAnimation}
        animationTime={300}
      />
    </Modal>
  );
};

export default ModifyItemModal;
