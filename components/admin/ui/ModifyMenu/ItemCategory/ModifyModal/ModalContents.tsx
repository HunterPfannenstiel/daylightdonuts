import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import useCollectCategoryInfo from "@_hooks/admin/menu/item-category/useCollectCategoryInfo";
import { CategorySelections, DBEntity } from "@_types/admin/modify-menu";
import CategoryName from "@_admin-reuse/Modify/ItemCategory/CategoryName";
import CategoryDisplayOrders from "@_admin-reuse/Modify/ItemCategory/CategoryDisplayOrders";
import NewSubcategories from "@_admin-reuse/Modify/ItemCategory/NewSubcategories";
import CategoryItems from "@_admin-reuse/Modify/ItemCategory/CategoryItems";
import ItemSubcategories from "@_admin-reuse/Modify/ItemCategory/ItemSubcategories";
import { ModifyItemCategory } from "@_utils/database/admin/menu-queries/categories";
import ModifyMenu from "custom-objects/ModifyMenu";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface ModalContentsProps {
  categories: DBEntity[];
  categoryName: string;
  categoryId: number;
  selections: CategorySelections;
  index: number;
  updateCategory: UpdateEntity;
  toggleModal: () => void;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  categoryName,
  categories,
  categoryId,
  selections,
  index,
  updateCategory,
  toggleModal,
}) => {
  const info = useCollectCategoryInfo(
    categoryName,
    categories,
    categoryId,
    selections
  );

  const onModify = async (e: FormEvent) => {
    e.preventDefault();

    const { addInfo, removeInfo } = info.getCategoryItemInfo();
    let initialIds: any[] = [];
    if (selections.initial_items) {
      initialIds = Object.keys(selections.initial_items).map((key) => {
        return +key;
      });
    }

    const { newIds, removedIds } = ModifyMenu.GetNewAndRemovedIds(
      initialIds,
      info.categoryItemIds
    );
    const newName = ModifyMenu.CompareVal(categoryName, info.name.current);
    const details = {
      itemCategoryId: categoryId,
      name: newName,
      displayOrder: info.categoryDisplayOrder.current,
      newSubcategories: ModifyMenu.CheckArrayLen(info.newSubcategories),
      removeSubcategoryIds: info.getRemovedSubcategoryIds(),
      categoryDisplayOrders: info.getCategoryDisplayOrders(),
      addItemInfos: addInfo,
      removeItemInfos: removeInfo,
      removeItemIds: removedIds,
      addItemIds: newIds,
    } as ModifyItemCategory;

    await ModifyMenu.Post.Modify("item-category", details);
    toggleModal();
    newName && updateCategory(newName, index);
  };
  return (
    <form onSubmit={onModify}>
      <CategoryName initialName={info.name} updateName={info.updateName} />
      <CategoryDisplayOrders
        onCategorySwap={info.swapCategories}
        categories={info.categories}
      />
      <NewSubcategories
        addNewSubcategory={info.addNewSubcategory}
        deleteNewSubcategory={info.deleteNewSubcategory}
        newSubcategories={info.newSubcategories}
      />
      <CategoryItems
        itemSelections={info.itemSelections}
        updateCategoryItem={info.updateCategoryItem}
      />
      <ItemSubcategories
        currentSubcategories={info.currentSubcategories}
        newSubcategories={info.newSubcategories}
        subcategoryItems={info.subcategoryItems}
        itemMapping={info.itemSelections}
        categoryItemIds={info.categoryItemIds}
        addItemToSubcategory={info.addItemToSubcategory}
        removeItemFromSubcategory={info.removeItemFromSubcategory}
        updateCategoryItem={info.updateCategoryItem}
      />
      <button>Submit</button>
    </form>
  );
};

export default ModalContents;
