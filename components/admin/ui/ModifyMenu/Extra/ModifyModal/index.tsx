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
import {
  AddNewNestedEntity,
  DeleteNestedEntity,
  UpdateNestedEntity,
} from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ModifyExtraModalProps {
  extraId: number;
  extraName: string;
  modalProps: ModalProps;
  categories: DBEntity[];
  groupings: NestedDBEntity[];
  index: number;
  updateExtra: UpdateNestedEntity;
  addExtra: AddNewNestedEntity;
  deleteExtra: DeleteNestedEntity;
}

const ModifyExtraModal: FunctionComponent<ModifyExtraModalProps> = ({
  extraId,
  extraName,
  modalProps,
  categories,
  groupings,
  index,
  updateExtra,
  addExtra,
  deleteExtra,
}) => {
  const { selections, isLoading, isError } =
    useInitialSelections<ExtraSelections>(extraId, "extra");
  if (isLoading) return <p>Loading...</p>;
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <ModalContents
        handleModal={modalProps.handleModal}
        index={index}
        updateExtra={updateExtra}
        addExtra={addExtra}
        deleteExtra={deleteExtra}
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
