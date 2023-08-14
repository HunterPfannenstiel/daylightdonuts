import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import SubcategoryName from "@_admin-reuse/Modify/ItemSubcategory/SubcategoryName";
import { DBEntity, SubcategorySelections } from "@_types/admin/modify-menu";
import useCollectSubcategoryInfo from "@_hooks/admin/menu/item-subcategory/useCollectSubcategoryInfo";
import SubcategoryItems from "@_admin-reuse/Modify/ItemSubcategory/SubcategoryItems";
import { ModifyItemSubcategory } from "@_utils/database/admin/menu-queries/categories";
import ModifyMenu from "custom-objects/ModifyMenu";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface ModalContentsProps {
  itemSubcategoryId: number;
  name: string;
  selections: SubcategorySelections;
  categories: DBEntity[];
  handleModal: () => void;
  index: number;
  updateSubcategory: UpdateEntity;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  itemSubcategoryId,
  name,
  selections,
  handleModal,
  categories,
  index,
  updateSubcategory,
}) => {
  const info = useCollectSubcategoryInfo(name, selections);
  const onModify = async (e: FormEvent) => {
    e.preventDefault();
    const { newIds, removedIds } = ModifyMenu.SelectionsToNewAndRemoved(
      selections.initial_items || {},
      info.getSelectedItemIds()
    );
    const details: ModifyItemSubcategory = {
      itemSubcategoryId,
      name: ModifyMenu.CompareVal(name, info.name.current),
      categoryId: ModifyMenu.CompareVal(
        selections.initial_category,
        info.selectedCategoryId
      ),
      addMenuItemIds: newIds,
      removeMenuItemIds: removedIds,
    };

    const res = await ModifyMenu.Post.Modify("item-subcategory", details);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (details.name) updateSubcategory(details.name, index);
    handleModal();
  };
  return (
    <form onSubmit={onModify}>
      <SubcategoryName initialName={info.name} updateName={info.updateName} />
      <SubcategoryItems
        selectedCategoryId={info.selectedCategoryId}
        updateCategory={info.updateCategory}
        updateItemId={info.updateSelectedItem}
        initialItemIds={info.getSelectedItemIds()}
        categories={categories}
      />
      <button>Submit</button>
    </form>
  );
};

export default ModalContents;
