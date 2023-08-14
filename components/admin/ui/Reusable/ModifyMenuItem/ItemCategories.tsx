import { FunctionComponent } from "react";
import classes from "./ItemCategories.module.css";
import Fieldset from "../Form/Fieldset";
import { NestedDBEntity } from "@_types/admin/modify-menu";
import { NestedSelections } from "@_hooks/admin/menu/modification/useNestedSelections";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import SelectInput from "@ui/Reusable/Form/SelectInput";

interface ItemCategoriesProps {
  itemCategories: NestedDBEntity[];
  selectedCategories: NestedSelections;
  updateHandler: (ids: {
    categoryId: number;
    subcategoryId: number | undefined;
  }) => void;
}

const ItemCategories: FunctionComponent<ItemCategoriesProps> = ({
  itemCategories,
  selectedCategories,
  updateHandler,
}) => {
  return (
    <Fieldset legend="Categories" className={classes.categories}>
      {itemCategories.map((category) => {
        const categoryIsSelected = !!(
          selectedCategories[category.id] ||
          selectedCategories[category.id] === null
        );
        return (
          <div key={category.name}>
            <SelectInput
              type="checkbox"
              label={category.name}
              id={category.name}
              defaultChecked={categoryIsSelected}
              handler={() => {
                updateHandler({
                  categoryId: category.id,
                  subcategoryId: undefined,
                });
              }}
              className={classes.category_label}
            />
            {categoryIsSelected && category.entities[0].name && (
              <div className={classes.subcategories}>
                <SelectInputList
                  selections={category.entities}
                  type="checkbox"
                  initialSelections={selectedCategories[category.id]}
                  onSelect={(id) => {
                    updateHandler({
                      categoryId: category.id,
                      subcategoryId: id,
                    });
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </Fieldset>
  );
};

export default ItemCategories;
