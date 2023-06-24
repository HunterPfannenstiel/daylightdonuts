import { FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import useCollectExtraGroupInfo from "@_hooks/admin/menu/extra-group/useCollectExtraGroupInfo";
import {
  CategoryExtra,
  DBEntity,
  ExtraGroupSelections,
} from "@_types/admin/modify-menu";
import ExtraGroupDetails from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupDetails";
import ExtraGroupExtras from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupExtras";
import ExtrasDisplayOrder from "@_admin-reuse/Modify/ExtraGroup/ExtrasDisplayOrder";
import ExtraGroupItems from "@_admin-reuse/Modify/ExtraGroup/ExtraGroupItems";
import { ModifyExtraGroup } from "@_utils/database/admin/menu-queries/extras";
import ModifyMenu from "custom-objects/ModifyMenu";

interface ModalContentsProps {
  groupId: number;
  groupName: string;
  extras: CategoryExtra[];
  categories: DBEntity[];
  items: DBEntity[];
  selections: ExtraGroupSelections;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  groupId,
  groupName,
  extras,
  categories,
  items,
  selections,
}) => {
  const info = useCollectExtraGroupInfo(groupName, extras, selections);
  const onSubmit = async () => {
    const extrasInfo = info.getExtraDisplayOrders();
    const initialExtraIds = ModifyMenu.SelectionsToArray(
      selections.initial_extras
    );
    const removeExtraIds = initialExtraIds.filter((id) => {
      if (!extrasInfo) return true;
      for (let i = 0; i < extrasInfo.length; i++) {
        if (extrasInfo[i].extraId === id) return false;
      }
      return true;
    });
    const { newIds, removedIds } = ModifyMenu.SelectionsToNewAndRemoved(
      selections.initial_items,
      info.selectedItemIds
    );
    const extraGroup = {
      extraGroupId: groupId,
      name: compareVal(groupName, info.name.current),
      categoryId: compareVal(
        selections.initial_category_id,
        info.selectedCategoryId.current
      ),
      extrasInfo,
      removeExtraIds,
      addMenuItemIds: newIds,
      removeMenuItemIds: removedIds,
    } as ModifyExtraGroup;
    try {
      await ModifyMenu.Post.Modify("extra-group", extraGroup);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ExtraGroupDetails
        initialName={info.name}
        updateHandler={info.updateName}
      />
      <ExtraGroupExtras
        title="Choose Extras!"
        categories={categories}
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

const compareVal = (origVal: any, newVal: any) => {
  return newVal === origVal ? undefined : newVal;
};

export default ModalContents;
