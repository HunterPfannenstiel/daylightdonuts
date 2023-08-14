import { ExtraCustomizations, NestedDBEntity } from "@_types/admin/modify-menu";
import Extra from "components/admin/ui/ModifyMenu/Extra";
import ModifyMenu from "custom-objects/ModifyMenu";

const ExtraPage = async () => {
  const cusomizations = await fetchExtraCustomizations();
  const extras = await fetchExtras();
  return <Extra customizations={cusomizations} initialExtras={extras} />;
};

export default ExtraPage;

const fetchExtraCustomizations = async () => {
  const res = await ModifyMenu.Get.Customizations<ExtraCustomizations>("extra");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

const fetchExtras = async () => {
  const res = await ModifyMenu.Get.Existing<NestedDBEntity[]>("extra");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};
