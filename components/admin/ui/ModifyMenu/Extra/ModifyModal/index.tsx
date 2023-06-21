import { FunctionComponent } from "react";
import useExtraSelections from "@_hooks/admin/menu/extras/useExtraSelections";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import { DBEntity, ExtraGroup } from "@_types/admin/modify-menu";

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
    <ModalDisplay modalProps={modalProps}>
      <ModalContents
        extraId={extraId}
        selections={selections!}
        name={extraName}
        categories={categories}
        groupings={groupings}
      />
    </ModalDisplay>
  );
};

export default ModifyExtraModal;
