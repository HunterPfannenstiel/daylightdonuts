import { FunctionComponent } from "react";
import classes from "./CreateSubcategoryModal.module.css";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import Pages from "@_admin-reuse/Pages";
import SubcategoryName from "@_admin-reuse/Modify/ItemSubcategory/SubcategoryName";
import useCollectSubcategoryInfo from "@_hooks/admin/menu/item-subcategory/useCollectSubcategoryInfo";
import SubcategoryItems from "@_admin-reuse/Modify/ItemSubcategory/SubcategoryItems";
import { DBEntity } from "@_types/admin/modify-menu";
import { CreateItemSubcategory } from "@_utils/database/admin/menu-queries/categories";
import ModifyMenu from "custom-objects/ModifyMenu";

interface CreateSubcategoryModalProps {
  modalProps: ModalProps;
  categories: DBEntity[];
}

const CreateSubcategoryModal: FunctionComponent<
  CreateSubcategoryModalProps
> = ({ modalProps, categories }) => {
  const info = useCollectSubcategoryInfo("");
  const onCreate = async () => {
    const details = {
      name: info.name.current,
      itemCategoryId: info.selectedCategoryId,
      menuItemIds: ModifyMenu.CheckArrayLen(
        ModifyMenu.SelectionsToArray(info.getSelectedItemIds())
      ),
    } as CreateItemSubcategory;

    const id = await ModifyMenu.Post.Create("item-subcategory", details);

    console.log(id);
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        submitHandler={onCreate}
        pages={[
          <SubcategoryName
            initialName={info.name}
            updateName={info.updateName}
          />,
          <SubcategoryItems
            selectedCategoryId={info.selectedCategoryId}
            updateCategory={info.updateCategory}
            updateItemId={info.updateSelectedItem}
            initialItemIds={info.getSelectedItemIds()}
            categories={categories}
          />,
        ]}
      />
    </ModifyMenuModal>
  );
};

export default CreateSubcategoryModal;
