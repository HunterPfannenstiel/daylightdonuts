import { CategoryCustomizations, DBEntity } from "@_types/admin/modify-menu";
import ItemCategory from "components/admin/ui/ModifyMenu/ItemCategory";
import ModifyMenu from "custom-objects/ModifyMenu";

const ItemCategoryPage = async () => {
  const categories = await fetchItemCategories();
  return <ItemCategory categories={categories} />;
};

export default ItemCategoryPage;

// const fetchItemCategoryCustomizations = async () => {
//     return (await ModifyMenu.Get.Customizations(
//       "extra-group"
//     )) as CategoryCustomizations;
//   };

const fetchItemCategories = async () => {
  const res = (await ModifyMenu.Get.Existing("item-category")) as DBEntity[];
  return res;
};
