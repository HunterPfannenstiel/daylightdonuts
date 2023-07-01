import { FunctionComponent } from "react";
import classes from "./SubcategoryList.module.css";
import DropContainer from "@_admin-reuse/ItemDrag/DropContainer";
import DropItem from "@_admin-reuse/ItemDrag/DropItem";
import DeletableItem from "@_admin-reuse/DeletableItem";
import {
  CategoryItems,
  DBEntity,
  SubcategoryItems,
} from "@_types/admin/modify-menu";

interface SubcategoryListsProps {
  subcategories: (DBEntity | { name: string })[];
  addItemToSubcategory: (name: string, id: number) => void;
  removeItemFromSubcategory: (subCategory: string, index: number) => void;
  subcategoryItems: SubcategoryItems;
  itemMapping: CategoryItems;
}

const SubcategoryLists: FunctionComponent<SubcategoryListsProps> = ({
  subcategories,
  addItemToSubcategory,
  removeItemFromSubcategory,
  subcategoryItems,
  itemMapping,
}) => {
  return (
    <>
      {subcategories.length !== 0 &&
        subcategories.map((subcategory) => {
          return (
            <DropContainer
              dropHandler={(dropValue) => {
                addItemToSubcategory(subcategory.name, +dropValue);
              }}
              dataName="item-drop"
            >
              <p>{subcategory.name}</p>
              {subcategoryItems[subcategory.name]?.map((item, i) => {
                return (
                  <DropItem dataName="item-drop" dataValue={item.toString()}>
                    <DeletableItem
                      onDelete={removeItemFromSubcategory.bind(
                        null,
                        subcategory.name,
                        i
                      )}
                    >
                      {itemMapping[item]}
                    </DeletableItem>
                  </DropItem>
                );
              })}
            </DropContainer>
          );
        })}
    </>
  );
};

export default SubcategoryLists;
