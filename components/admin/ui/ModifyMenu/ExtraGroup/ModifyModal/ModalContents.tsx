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

interface ModalContentsProps {
  groupName: string;
  extras: CategoryExtra[];
  categories: DBEntity[];
  items: DBEntity[];
  selections: ExtraGroupSelections;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  groupName,
  extras,
  categories,
  items,
  selections,
}) => {
  const info = useCollectExtraGroupInfo(groupName, extras, selections);
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
    </>
  );
};

export default ModalContents;
