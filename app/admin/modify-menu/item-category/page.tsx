import { DBEntity } from "@_types/admin/modify-menu";
import ItemCategory from "components/admin/ui/ModifyMenu/ItemCategory";
import ModifyMenu from "custom-objects/ModifyMenu";

const ItemCategoryPage = async () => {
  const categories = await fetchItemCategories();
  return <ItemCategory initialCategories={categories} />;
};

export default ItemCategoryPage;

// const fetchItemCategoryCustomizations = async () => {
//     return (await ModifyMenu.Get.Customizations(
//       "extra-group"
//     )) as CategoryCustomizations;
//   };

const fetchItemCategories = async () => {
  const res = await ModifyMenu.Get.Existing<DBEntity[]>("item-category");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};
