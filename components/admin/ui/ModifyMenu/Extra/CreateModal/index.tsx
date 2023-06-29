"use client";

import { FunctionComponent, useRef } from "react";
import Pages from "@_admin-reuse/Pages";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";
import ExtraGroups from "@_admin-reuse/Modify/Extras/ExtraGroups";
import { DBEntity, ExtraGroup } from "@_types/admin/modify-menu";
import useCollectExtraInfo from "@_hooks/admin/menu/extras/useCollectExtraInfo";
import { CreateExtra } from "@_utils/database/admin/menu-queries/extras";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import ModifyMenu from "custom-objects/ModifyMenu";
import { AddNewNestedEntity } from "@_hooks/admin/menu/useUpdateNestedEntities";

interface CreateExtraModalProps {
  categories: DBEntity[];
  groupings: ExtraGroup[];
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
  console.log(info);
  const canFlipCurrPage = useRef(true);
  const updatePageFlip = (bool: boolean) => {
    canFlipCurrPage.current = bool;
  };
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
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        beforePageTurn={() => canFlipCurrPage.current}
        pages={[
          <ExtraDetails
            initialDetails={info.extraDetails}
            updateHandler={info.updateDetails}
            canFlipPage={updatePageFlip}
          />,
          <ExtraGroups
            initialGroups={info.selectedGroupingIds}
            initialCategoryId={info.selectedCategoryId}
            updateCategory={info.updateCategoryId}
            updateGroupings={info.updateGroup}
            categories={categories}
            groupSelections={groupings}
            canFlipPage={updatePageFlip}
          />,
        ]}
        submitHandler={onSubmit}
      />
    </ModifyMenuModal>
  );
};
export default CreateExtraModal;
