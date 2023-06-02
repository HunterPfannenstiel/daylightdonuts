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

interface ModifyItemModalProps {
  id: number;
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
  closeModal: () => void;
}

const ModifyItemModal: FunctionComponent<ModifyItemModalProps> = ({
  id,
  groupings,
  extraGroupings,
  itemCategories,
  closeModal,
}) => {
  const { selections } = useItemSelections(id);
  if (!selections) return <p>Loading...</p>;
  return (
    <div>
      <p onClick={closeModal}>X</p>
      <ModalContents
        id={id}
        selections={selections}
        groupings={groupings}
        extraGroupings={extraGroupings}
        itemCategories={itemCategories}
      />
    </div>
  );
};

export default ModifyItemModal;
