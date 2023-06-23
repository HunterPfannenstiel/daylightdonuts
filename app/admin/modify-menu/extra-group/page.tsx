import {
  ExtraGroup as ExtraGroupT,
  ExtraGroupCustomizations,
} from "@_types/admin/modify-menu";
import ExtraGroup from "components/admin/ui/ModifyMenu/ExtraGroup";
import CreateExtraGroupModal from "components/admin/ui/ModifyMenu/ExtraGroup/CreateModal";

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/extra-group/customizations`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ExtraGroupCustomizations;
};

const fetchExtraGroups = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/extra-group/fetch-groups`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ExtraGroupT[];
};
