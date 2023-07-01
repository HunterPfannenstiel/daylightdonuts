import {
  DBEntity,
  ExtraCategoryCustomizations,
} from "@_types/admin/modify-menu";
import ExtraCategory from "components/admin/ui/ModifyMenu/ExtraCategory";
import ModifyMenu from "custom-objects/ModifyMenu";

const ExtraCategoryPage = async () => {
  const customizations = await fetchExtraCategoryCustomizations();
  const categories = await fetchExtraCategories();

  return (
    <ExtraCategory
      customizations={customizations}
      initialCategories={categories}
    />
  );
};

export default ExtraCategoryPage;

const fetchExtraCategoryCustomizations = async () => {
  const res = await ModifyMenu.Get.Customizations<ExtraCategoryCustomizations>(
    "extra-category"
  );
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

const fetchExtraCategories = async () => {
  const res = await ModifyMenu.Get.Existing<DBEntity[]>("extra-category");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};
