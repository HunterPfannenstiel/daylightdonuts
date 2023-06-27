import { FunctionComponent } from "react";
import classes from "./CreateModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import Pages from "@_admin-reuse/Pages";
import CategoryName from "@_admin-reuse/Modify/ItemCategory/CategoryName";
import useCollectCategoryInfo from "@_hooks/admin/menu/item-category/useCollectCategoryInfo";
import CategoryDisplayOrders from "@_admin-reuse/Modify/ItemCategory/CategoryDisplayOrders";
import ItemSubcategories from "@_admin-reuse/Modify/ItemCategory/ItemSubcategories";
import NewSubcategories from "@_admin-reuse/Modify/ItemCategory/NewSubcategories";
import CategoryItems from "@_admin-reuse/Modify/ItemCategory/CategoryItems";
import { DBEntity } from "@_types/admin/modify-menu";
import { CreateItemCategory } from "@_utils/database/admin/menu-queries/categories";
import ModifyMenu from "custom-objects/ModifyMenu";

interface CreateModalProps {
  modalProps: ModalProps;
  categories: DBEntity[];
}

const CreateModal: FunctionComponent<CreateModalProps> = ({
  modalProps,
  categories,
}) => {
  const info = useCollectCategoryInfo("", categories);
  const onSubmit = async () => {
    const details = {
      name: info.name.current,
      displayOrder: info.categoryDisplayOrder.current,
      categoryDisplayOrders: info.getCategoryDisplayOrders(),
      newSubcategories: info.newSubcategories,
      itemInfos: info.getCategoryItemInfo().addInfo,
      categoryItemIds: info.categoryItemIds,
    } as CreateItemCategory;
    const newId = await ModifyMenu.Post.Create("item-category", details);
    console.log(newId);
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        submitHandler={onSubmit}
        pages={[
          <CategoryName initialName={info.name} updateName={info.updateName} />,
          <CategoryDisplayOrders
            onCategorySwap={info.swapCategories}
            categories={info.categories}
          />,
          <NewSubcategories
            addNewSubcategory={info.addNewSubcategory}
            deleteNewSubcategory={info.deleteNewSubcategory}
            newSubcategories={info.newSubcategories}
          />,
          <CategoryItems
            itemSelections={info.itemSelections}
            updateCategoryItem={info.updateCategoryItem}
          />,
          <ItemSubcategories
            currentSubcategories={info.currentSubcategories}
            newSubcategories={info.newSubcategories}
            subcategoryItems={info.subcategoryItems}
            itemMapping={info.itemSelections}
            categoryItemIds={info.categoryItemIds}
            addItemToSubcategory={info.addItemToSubcategory}
            removeItemFromSubcategory={info.removeItemFromSubcategory}
            updateCategoryItem={info.updateCategoryItem}
          />,
        ]}
      />
    </ModifyMenuModal>
  );
};

export default CreateModal;
