import { FunctionComponent } from "react";
import classes from "./SubcategoryItems.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { DBEntity } from "@_types/admin/modify-menu";
import useItemsInCategory from "@_hooks/admin/menu/item-subcategory/useItemsInCategory";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";

interface SubcategoryItemsProps {
  title?: string;
  categories: DBEntity[];
  selectedCategoryId?: number;
  updateCategory: (id: number) => void;
  initialItemIds: InitialSelections;
  updateItemId: (id: number, value?: boolean) => void;
}

const SubcategoryItems: FunctionComponent<SubcategoryItemsProps> = ({
  title,
  categories,
  selectedCategoryId,
  updateCategory,
  initialItemIds,
  updateItemId,
}) => {
  const { data, setCategoryId } = useItemsInCategory(selectedCategoryId);
  return (
    <Fieldset legend={title}>
      <SelectInputList
        type="radio"
        initialSelection={selectedCategoryId}
        onSelect={(id) => {
          updateCategory(id);
          setCategoryId(id);
        }}
        selections={categories}
        radioName="category"
        title="Item Categories"
      />
      {data && (
        <SelectInputList
          type="checkbox"
          initialSelections={initialItemIds}
          onSelect={(id, _, selected) => {
            updateItemId(id, selected);
          }}
          selections={data}
          title="Current Items in Category"
        />
      )}
    </Fieldset>
  );
};

export default SubcategoryItems;
