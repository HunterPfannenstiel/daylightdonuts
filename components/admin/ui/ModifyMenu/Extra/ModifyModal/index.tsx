import { FunctionComponent } from "react";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import {
  DBEntity,
  ExtraGroup,
  ExtraSelections,
} from "@_types/admin/modify-menu";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { UpdateNestedEntity } from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ModifyExtraModalProps {
  extraId: number;
  extraName: string;
  modalProps: ModalProps;
  categories: DBEntity[];
  groupings: ExtraGroup[];
  updateExtra: UpdateNestedEntity;
}

const ModifyExtraModal: FunctionComponent<ModifyExtraModalProps> = ({
  extraId,
  extraName,
  modalProps,
  categories,
  groupings,
  updateExtra,
}) => {
  const { selections, isLoading, isError } =
    useInitialSelections<ExtraSelections>(extraId, "extra");
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
