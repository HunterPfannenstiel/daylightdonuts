import { FunctionComponent } from "react";
import classes from "./CreateExtraGroupModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import Pages from "@_admin-reuse/Pages";
import useCollectExtraGroupInfo from "@_hooks/admin/menu/extra-group/useCollectExtraGroupInfo";
import {
  CategoryExtra,
  DBEntity,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import ExtraGroupDetails from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupDetails";
import ExtraGroupExtras from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupExtras";
import ExtrasDisplayOrder from "@_admin-reuse/Modify/ExtraGroup/ExtrasDisplayOrder";
import ExtraGroupItems from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupItems";
import { CreateExtraGroup } from "@_utils/database/admin/menu-queries/extras";
import { AddNewNestedEntity } from "@_hooks/admin/menu/useUpdateNestedEntities";
import ModifyMenu from "custom-objects/ModifyMenu";

interface CreateExtraGroupModalProps {
  modalProps: ModalProps;
  extras: NestedDBEntity[];
  items: (DBEntity & { extra_group_ids: number[] })[];
  addNewGroup: AddNewNestedEntity;
}

const CreateExtraGroupModal: FunctionComponent<CreateExtraGroupModalProps> = ({
  modalProps,
  extras,
  items,
  addNewGroup,
}) => {
  const info = useCollectExtraGroupInfo("", extras);
  const onSubmit = async () => {
    const categoryId = info.selectedCategoryId.current;
    const extraGroup = {
      name: info.name.current,
      categoryId,
      extrasInfo: info.getExtraDisplayOrders(),
      menuItemIds: info.getMenuItemIds(),
    } as CreateExtraGroup;
    const res = await ModifyMenu.Post.Create<number>("extra-group", extraGroup);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    addNewGroup({ id: res.data, name: info.name.current }, categoryId!);
    modalProps.handleModal();
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        submitHandler={onSubmit}
        pages={[
          <ExtraGroupDetails
            initialName={info.name}
            updateHandler={info.updateName}
          />,
          <ExtraGroupExtras
            title="Choose Extras!"
            extras={extras}
            initialExtras={info.selectedExtraIds}
            initialCategoryId={info.selectedCategoryId}
            updateCategory={info.updateSelectedCategory}
            updateExtra={info.updateSelectedExtra}
          />,
          <ExtrasDisplayOrder
            title="Choose Display Order!"
            extras={info.selectedExtras}
            onSwap={info.swapExtras}
          />,
          <ExtraGroupItems
            items={items}
            initialItems={info.selectedItemIds}
            updateItemSelection={info.updateSelectedItemId}
          />,
        ]}
      />
    </ModifyMenuModal>
  );
};

export default CreateExtraGroupModal;
