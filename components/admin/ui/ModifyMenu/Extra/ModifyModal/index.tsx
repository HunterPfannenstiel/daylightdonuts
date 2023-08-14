import { FunctionComponent } from "react";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModalContents from "./ModalContents";
import {
  DBEntity,
  ExtraSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import useInitialSelections from "@_hooks/admin/menu/useInitialSelections";
import { NestedEntityFunctions } from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ModifyExtraModalProps {
  extraId: number;
  extraName: string;
  modalProps: ModalProps;
  categories: DBEntity[];
  groupings: NestedDBEntity[];
  index: number;
  modifyEntity: NestedEntityFunctions;
}

const ModifyExtraModal: FunctionComponent<ModifyExtraModalProps> = ({
  extraId,
  extraName,
  modalProps,
  categories,
  groupings,
  index,
  modifyEntity,
}) => {
  const { selections, isLoading, isError } =
    useInitialSelections<ExtraSelections>(extraId, "extra");
  return (
    <ModifyMenuModal modalProps={modalProps} isLoading={isLoading}>
      <ModalContents
        handleModal={modalProps.handleModal}
        index={index}
        modifyEntity={modifyEntity}
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
