import { FunctionComponent } from "react";
import classes from "./CategoryItems.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import { CategoryItems, DBEntity } from "@_types/admin/modify-menu";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import useSearchItems from "@_hooks/admin/menu/useSearchItems";

interface CategoryItemsProps {
  title?: string;
  itemSelections: CategoryItems;
  updateCategoryItem: (id: number, name?: string) => void;
}

const CategoryItems: FunctionComponent<CategoryItemsProps> = ({
  title,
  itemSelections,
  updateCategoryItem,
}) => {
  const { data } = useSearchItems();
  return (
    <Fieldset legend={title}>
      <SelectInputList
        onSelect={(id, name, selected) => {
          if (selected) {
            updateCategoryItem(id, name);
          } else {
            updateCategoryItem(id);
          }
        }}
        initialSelections={itemSelections}
        selections={data}
        type="checkbox"
      />
    </Fieldset>
  );
};

export default CategoryItems;
