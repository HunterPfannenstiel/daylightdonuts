import { FunctionComponent } from "react";
import classes from "./ItemCategories.module.css";
import {
  AvailableItemCategory,
  SelectedItemCategories,
} from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";

//CHECK BOXES

interface ItemCategoriesProps {
  itemCategories: AvailableItemCategory[];
  selectedCategories: SelectedItemCategories;
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
    <Fieldset legend="Categories">
      {itemCategories.map((category) => {
        const categoryIsSelected =
          !!selectedCategories[category.item_category_id];
        return (
          <div key={category.name}>
            <input
              type="checkbox"
              id={category.name}
              defaultChecked={categoryIsSelected}
              onChange={updateHandler.bind(null, {
                categoryId: category.item_category_id,
                subcategoryId: undefined,
              })}
            />
            <label htmlFor={category.name}>{category.name}</label>
            {categoryIsSelected && category.subcategories[0].name && (
              <div>
                {category.subcategories.map((subcategory) => {
                  return (
                    <div key={subcategory.name}>
                      <input
                        type="checkbox"
                        id={subcategory.name}
                        defaultChecked={
                          !!selectedCategories[category.item_category_id]![
                            subcategory.item_subcategory_id
                          ]
                        }
                        onChange={updateHandler.bind(null, {
                          categoryId: category.item_category_id,
                          subcategoryId: subcategory.item_subcategory_id,
                        })}
                      />
                      <label htmlFor={subcategory.name}>
                        {subcategory.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </Fieldset>
  );
};

export default ItemCategories;