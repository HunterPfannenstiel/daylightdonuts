import { FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import useCollectExtraGroupInfo from "@_hooks/admin/menu/extra-group/useCollectExtraGroupInfo";
import {
  CategoryExtra,
  DBEntity,
  ExtraGroupSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import ExtraGroupDetails from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupDetails";
import ExtraGroupExtras from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupExtras";
import ExtrasDisplayOrder from "@_admin-reuse/Modify/ExtraGroup/ExtrasDisplayOrder";
import ExtraGroupItems from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupItems";
import { ModifyExtraGroup } from "@_utils/database/admin/menu-queries/extras";
import ModifyMenu from "custom-objects/ModifyMenu";
import { NestedEntityFunctions } from "@_hooks/admin/menu/useUpdateNestedEntities";

interface ModalContentsProps {
  groupId: number;
  groupName: string;
  extras: NestedDBEntity[];
  items: DBEntity[];
  selections: ExtraGroupSelections;
  index: number;
  handleModal: () => void;
  entityFns: NestedEntityFunctions;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  groupId,
  groupName,
  extras,
  items,
  selections,
  index,
  handleModal,
  entityFns,
}) => {
  const info = useCollectExtraGroupInfo(groupName, extras, selections);
  const onSubmit = async () => {
    const extrasInfo = info.getExtraDisplayOrders();
    const initialExtraIds = ModifyMenu.SelectionsToArray(
      selections.initial_extras || {}
    );
    const removeExtraIds = initialExtraIds.filter((id) => {
      if (!extrasInfo) return true;
      for (let i = 0; i < extrasInfo.length; i++) {
        if (extrasInfo[i].extraId.toString() === id) return false;
      }
      return true;
    });
    const { newIds, removedIds } = ModifyMenu.SelectionsToNewAndRemoved(
      selections.initial_items || {},
      info.selectedItemIds
    );
    const newName = ModifyMenu.CompareVal(groupName, info.name.current);
    const newCategoryId = ModifyMenu.CompareVal(
      selections.initial_category_id,
      info.selectedCategoryId.current
    );
    const extraGroup = {
      extraGroupId: groupId,
      name: newName,
      categoryId: newCategoryId,
      extrasInfo,
      removeExtraIds,
      addMenuItemIds: newIds,
      removeMenuItemIds: removedIds,
    } as ModifyExtraGroup;

    const res = await ModifyMenu.Post.Modify("extra-group", extraGroup);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (newName) {
      if (newCategoryId) {
        entityFns.deleteEntity(selections.initial_category_id, index);
        entityFns.addNewEntity({ id: groupId, name: newName }, newCategoryId);
      } else {
        entityFns.updateEntity(newName, selections.initial_category_id, index);
      }
    } else if (newCategoryId) {
      entityFns.deleteEntity(selections.initial_category_id, index);
      entityFns.addNewEntity({ id: groupId, name: groupName }, newCategoryId);
    }
    handleModal();
  };
  return (
    <>
      <ExtraGroupDetails
        initialName={info.name}
        updateHandler={info.updateName}
      />
      <ExtraGroupExtras
        title="Choose Extras!"
        extras={extras}
        initialExtras={info.selectedExtraIds}
        initialCategoryId={info.selectedCategoryId}
        updateCategory={info.updateSelectedCategory}
        updateExtra={info.updateSelectedExtra}
      />
      <ExtrasDisplayOrder
        title="Choose Display Order!"
        extras={info.selectedExtras}
        onSwap={info.swapExtras}
      />
      <ExtraGroupItems
        items={items}
        initialItems={info.selectedItemIds}
        updateItemSelection={info.updateSelectedItemId}
      />
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

export default ModalContents;
