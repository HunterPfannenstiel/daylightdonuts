import { FunctionComponent } from "react";
import classes from "./CreateExtraGroupModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import Pages from "@_admin-reuse/Pages";
import useCollectExtraGroupInfo from "@_hooks/admin/menu/extra-group/useCollectExtraGroupInfo";
import { CategoryExtra, DBEntity } from "@_types/admin/modify-menu";
import ExtraGroupDetails from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupDetails";
import ExtraGroupExtras from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupExtras";
import ExtrasDisplayOrder from "@_admin-reuse/Modify/ExtraGroup/ExtrasDisplayOrder";
import ExtraGroupItems from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupItems";
import { CreateExtraGroup } from "@_utils/database/admin/menu-queries/extras";

interface CreateExtraGroupModalProps {
  modalProps: ModalProps;
  extras: CategoryExtra[];
  categories: DBEntity[];
  items: (DBEntity & { extra_group_ids: number[] })[];
}

const CreateExtraGroupModal: FunctionComponent<CreateExtraGroupModalProps> = ({
  modalProps,
  extras,
  categories,
  items,
}) => {
  const info = useCollectExtraGroupInfo("", extras);
  const onSubmit = async () => {
    const extraGroup = {
      name: info.name.current,
      categoryId: info.selectedCategoryId.current,
      extrasInfo: info.getExtraDisplayOrders(),
      menuItemIds: info.getMenuItemIds(),
    } as CreateExtraGroup;
    const res = await fetch("/api/admin/modify-menu/extra-group/modify", {
      method: "POST",
      body: JSON.stringify(extraGroup),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("An error occured", data);
    } else {
      console.log("New ExtraGroup Id!", data);
    }
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
            categories={categories}
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
      ></Pages>
    </ModifyMenuModal>
  );
};

export default CreateExtraGroupModal;
