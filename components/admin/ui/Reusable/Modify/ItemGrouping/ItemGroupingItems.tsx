import { FunctionComponent } from "react";
import classes from "./ItemGroupingItems.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SearchItems from "../SearchItems";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

interface ItemGroupingItemsProps {
  initialItems: InitialSelections;
  updateGroupingItem: (id: number, name: string, isSelected: boolean) => void;
}

const ItemGroupingItems: FunctionComponent<ItemGroupingItemsProps> = ({
  initialItems,
  updateGroupingItem,
}) => {
  return (
    <Fieldset>
      <SearchItems
        itemSelections={initialItems}
        onItemSelect={updateGroupingItem}
      />
    </Fieldset>
  );
};

export default ItemGroupingItems;
