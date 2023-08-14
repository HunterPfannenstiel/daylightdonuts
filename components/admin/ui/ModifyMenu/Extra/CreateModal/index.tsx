"use client";

import { FunctionComponent } from "react";
import Pages from "@_admin-reuse/Pages";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";
import ExtraGroups from "@_admin-reuse/Modify/Extras/ExtraGroups";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";
import useCollectExtraInfo from "@_hooks/admin/menu/extras/useCollectExtraInfo";
import { CreateExtra } from "@_utils/database/admin/menu-queries/extras";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import ModifyMenu from "custom-objects/ModifyMenu";
import { AddNewNestedEntity } from "@_hooks/admin/menu/useUpdateNestedEntities";

interface CreateExtraModalProps {
  categories: DBEntity[];
  groupings: NestedDBEntity[];
  modalProps: ModalProps;
  addNewExtra: AddNewNestedEntity;
}

const CreateExtraModal: FunctionComponent<CreateExtraModalProps> = ({
  categories,
  groupings,
  modalProps,
  addNewExtra,
}) => {
  const info = useCollectExtraInfo();
  const onSubmit = async () => {
    const groupInfo = info.getExtraGroupInfo();
    const { name, price, abbreviation } = info.extraDetails;
    const categoryId = info.selectedCategoryId.current!;
    const extraInfo = {
      name,
      price,
      abbreviation,
      groupInfo,
      categoryId,
    } as CreateExtra;

    const res = await ModifyMenu.Post.Create<number>("extra", extraInfo);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    addNewExtra({ name, id: res.data }, categoryId);
    modalProps.handleModal();
  };
  const canFlipPage = (currPage: number) => {
    switch (currPage) {
      case 0:
        if (!info.extraDetails.name) return "Please enter a name";
        break;
      case 1:
        if (info.selectedCategoryId.current === undefined)
          return "Please select a category";
        break;
    }
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        beforePageTurn={canFlipPage}
        pages={[
          <ExtraDetails {...info.getExtraDetailsProps()} />,
          <ExtraGroups
            {...info.getExtraGroupProps()}
            categories={categories}
            groupSelections={groupings}
          />,
        ]}
        submitHandler={onSubmit}
      />
    </ModifyMenuModal>
  );
};
export default CreateExtraModal;
