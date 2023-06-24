import { CategoryExtras, ExtraCustomizations } from "@_types/admin/modify-menu";
import Extra from "components/admin/ui/ModifyMenu/Extra";
import ModifyMenu from "custom-objects/ModifyMenu";

const ExtraPage = async () => {
  const cusomizations = await fetchExtraCustomizations();
  const extras = await fetchExtras();
  return <Extra customizations={cusomizations} extras={extras} />;
};

export default ExtraPage;

const fetchExtraCustomizations = async () => {
  return (await ModifyMenu.Get.Customizations("extra")) as ExtraCustomizations;
};

const fetchExtras = async () => {
  return (await ModifyMenu.Get.Existing("extra")) as CategoryExtras[];
};
