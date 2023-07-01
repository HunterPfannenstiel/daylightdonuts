import { FunctionComponent } from "react";
import classes from "./ItemSubcategories.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import {
  CategoryItems,
  DBEntity,
  SubcategoryItems,
} from "@_types/admin/modify-menu";
import DropContainer from "@_admin-reuse/ItemDrag/DropContainer";
import DropItem from "@_admin-reuse/ItemDrag/DropItem";
import DeletableItem from "@_admin-reuse/DeletableItem";
import SubcategoryLists from "./SubcategoryLists";

interface ItemSubcategoriesProps {
  currentSubcategories: DBEntity[];
  newSubcategories: { name: string }[];
  itemMapping: CategoryItems;
  subcategoryItems: SubcategoryItems;
  categoryItemIds: number[];
  addItemToSubcategory: (name: string, id: number) => void;
  removeItemFromSubcategory: (subCategory: string, index: number) => void;
  updateCategoryItem: (id: number, name?: string) => void;
}

const ItemSubcategories: FunctionComponent<ItemSubcategoriesProps> = ({
  currentSubcategories,
  newSubcategories,
  subcategoryItems,
  itemMapping,
  addItemToSubcategory,
  removeItemFromSubcategory,
  categoryItemIds,
  updateCategoryItem,
}) => {
  return (
    <Fieldset>
      <SubcategoryLists
        subcategories={currentSubcategories}
        addItemToSubcategory={addItemToSubcategory}
        removeItemFromSubcategory={removeItemFromSubcategory}
        subcategoryItems={subcategoryItems}
        itemMapping={itemMapping}
      />
      <SubcategoryLists
        subcategories={newSubcategories}
        addItemToSubcategory={addItemToSubcategory}
        removeItemFromSubcategory={removeItemFromSubcategory}
        subcategoryItems={subcategoryItems}
        itemMapping={itemMapping}
      />
      <div>
        {categoryItemIds.map((id) => {
          return (
            <DropItem dataName="item-drop" dataValue={id.toString()}>
              <DeletableItem onDelete={updateCategoryItem.bind(null, id)}>
                {itemMapping[id]}
              </DeletableItem>
            </DropItem>
          );
        })}
      </div>
    </Fieldset>
  );
};

export default ItemSubcategories;
