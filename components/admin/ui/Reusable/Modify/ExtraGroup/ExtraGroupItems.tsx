import { FunctionComponent } from "react";
import classes from "./ExtraGroupItems.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import { DBEntity } from "@_types/admin/modify-menu";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

interface ExtraGroupItemsProps {
  title?: string;
  items: DBEntity[];
  initialItems: InitialSelections;
  updateItemSelection: (id: number) => void;
}

const ExtraGroupItems: FunctionComponent<ExtraGroupItemsProps> = ({
  title,
  items,
  initialItems,
  updateItemSelection,
}) => {
  return (
    <Fieldset legend={title}>
      <SelectInputList
        selections={items}
        initialSelections={initialItems}
        onSelect={updateItemSelection}
        type="checkbox"
      />
    </Fieldset>
  );
};

export default ExtraGroupItems;
