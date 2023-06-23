import { FunctionComponent } from "react";
import useExtraSelections from "@_hooks/admin/menu/extras/useExtraSelections";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import { DBEntity, ExtraGroup } from "@_types/admin/modify-menu";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";

interface ModifyExtraModalProps {
  extraId: number;
  extraName: string;
  modalProps: ModalProps;
  categories: DBEntity[];
  groupings: ExtraGroup[];
}

const ModifyExtraModal: FunctionComponent<ModifyExtraModalProps> = ({
  extraId,
  extraName,
  modalProps,
  categories,
  groupings,
}) => {
  const { selections, isLoading, isError } = useExtraSelections(extraId);
  if (isLoading) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        extraId={extraId}
        selections={selections!}
        name={extraName}
        categories={categories}
        groupings={groupings}
      />
    </ModifyMenuModal>
  );
};

export default ModifyExtraModal;
