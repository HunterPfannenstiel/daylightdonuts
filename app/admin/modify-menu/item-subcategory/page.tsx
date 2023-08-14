import { DBEntity, SubcategoryCustomizations } from "@_types/admin/modify-menu";
import ItemSubcategory from "components/admin/ui/ModifyMenu/ItemSubcategory";
import ModifyMenu from "custom-objects/ModifyMenu";

const ItemSubcategoryPage = async () => {
  const customizations = await fetchSubcategoryCustomizations();
  const subcategories = await fetchSubcategories();

  return (
    <ItemSubcategory
      customizations={customizations}
      initialSubcategories={subcategories}
    />
  );
};

export default ItemSubcategoryPage;

const fetchSubcategoryCustomizations = async () => {
  const res = await ModifyMenu.Get.Customizations<SubcategoryCustomizations>(
    "item-subcategory"
  );
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

const fetchSubcategories = async () => {
  const res = await ModifyMenu.Get.Existing<DBEntity[]>("item-subcategory");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};
