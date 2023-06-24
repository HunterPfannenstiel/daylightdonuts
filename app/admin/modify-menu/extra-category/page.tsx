import {
  DBEntity,
  ExtraCategoryCustomizations,
} from "@_types/admin/modify-menu";
import ModifyMenu from "custom-objects/ModifyMenu";

const ExtraCategoryPage = async () => {
  const customizations = await fetchExtraCategoryCustomizations();
  const categories = await fetchExtraCategories();
};

export default ExtraCategoryPage;

const fetchExtraCategoryCustomizations = async () => {
  return (await ModifyMenu.Get.Customizations(
    "extra-category"
  )) as ExtraCategoryCustomizations;
};

const fetchExtraCategories = async () => {
  const res = (await ModifyMenu.Get.Existing("extra-category")) as DBEntity[];
  return res;
};
