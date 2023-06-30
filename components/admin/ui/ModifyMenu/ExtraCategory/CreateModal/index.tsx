import { FunctionComponent } from "react";
import classes from "./CreateExtraCategoryModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import Pages from "@_admin-reuse/Pages";
import ExtraCategoryName from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryName";
import useCollectExtraCategoryInfo from "@_hooks/admin/menu/extra-category/useCollectExtraCategoryInfo";
import ExtraCategoryNewExtras from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryNewExtras";
import ExtraCategoryExistingExtras from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryExistingExtras";
import { DBEntity } from "@_types/admin/modify-menu";
import { CreateExtraCategory } from "@_utils/database/admin/menu-queries/extras";
import ModifyMenu from "custom-objects/ModifyMenu";
import { AddNewEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface CreateExtraCategoryModalProps {
  modalProps: ModalProps;
  existingExtras: DBEntity[];
  addNewCategory: AddNewEntity;
}

const CreateExtraCategoryModal: FunctionComponent<
  CreateExtraCategoryModalProps
> = ({ modalProps, existingExtras, addNewCategory }) => {
  const info = useCollectExtraCategoryInfo("");
  const onSumbit = async () => {
    const details = {
      name: info.name.current,
      newExtras: info.newExtras,
      addExtraIds: ModifyMenu.SelectionsToArray(info.selectedExtraIds),
    } as CreateExtraCategory;

    console.log(details);
    const res = await ModifyMenu.Post.Create<number>("extra-category", details);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    addNewCategory({ id: res.data, name: info.name.current });
    modalProps.handleModal();
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        submitHandler={onSumbit}
        pages={[
          <ExtraCategoryName
            updateName={info.updateName}
            initialName={info.name}
          />,
          <ExtraCategoryNewExtras
            initialExtraDetails={info.currentNewExtra}
            updateExtraDetails={info.updateNewExtra}
            addCurrentNewExtra={info.addCurrentNewExtra}
            removeNewExtra={info.removeNewExtra}
            extras={info.newExtras}
            replaceCurrentNewExtra={info.replaceCurrentNewExtra}
          />,
          <ExtraCategoryExistingExtras
            extras={existingExtras}
            onExtraSelected={info.updateSelectedExtra}
            initialExtraIds={info.selectedExtraIds}
            selectedExtras={info.selectedExtras}
          />,
        ]}
      />
    </ModifyMenuModal>
  );
};

export default CreateExtraCategoryModal;
