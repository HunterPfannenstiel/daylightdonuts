import {
  ExtraGroup as ExtraGroupT,
  ExtraGroupCustomizations,
} from "@_types/admin/modify-menu";
import ExtraGroup from "components/admin/ui/ModifyMenu/ExtraGroup";
import ModifyMenu from "custom-objects/ModifyMenu";

const ExtraGroupPage = async () => {
  const customizations = await fetchExtraGroupCustomizations();
  const categoryGroups = await fetchExtraGroups();
  return (
    <ExtraGroup
      categories={customizations.categories}
      extras={customizations.extras}
      items={customizations.items}
      categoryGroups={categoryGroups}
    />
  );
};

export default ExtraGroupPage;

const fetchExtraGroupCustomizations = async () => {
  return (await ModifyMenu.Get.Customizations(
    "extra-group"
  )) as ExtraGroupCustomizations;
};

const fetchExtraGroups = async () => {
  const res = (await ModifyMenu.Get.Existing("extra-group")) as ExtraGroupT[];
  return res;
};
