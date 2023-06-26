import { DBEntity, SubcategoryCustomizations } from "@_types/admin/modify-menu";
import ItemSubcategory from "components/admin/ui/ModifyMenu/ItemSubcategory";
import ModifyMenu from "custom-objects/ModifyMenu";

const ItemSubcategoryPage = async () => {
  const customizations = await fetchSubcategoryCustomizations();
  const subcategories = await fetchSubcategories();

  return (
    <ItemSubcategory
      customizations={customizations}
      subcategories={subcategories}
    />
  );
};

export default ItemSubcategoryPage;

const fetchSubcategoryCustomizations = async () => {
  return (await ModifyMenu.Get.Customizations(
    "item-subcategory"
  )) as SubcategoryCustomizations;
};

const fetchSubcategories = async () => {
  const res = (await ModifyMenu.Get.Existing("item-subcategory")) as DBEntity[];
  return res;
};
