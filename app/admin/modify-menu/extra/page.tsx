import { ExtraCustomizations } from "@_types/admin/modify-menu";
import CreateExtraModal from "components/admin/ui/ModifyMenu/CreateExtraModal";

const ExtraPage = async () => {
  const cusomizations = await fetchExtraCustomizations();
  return (
    <CreateExtraModal
      categories={cusomizations.categories}
      groupings={cusomizations.groups}
    />
  );
};

export default ExtraPage;

const fetchExtraCustomizations = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/extra/customizations`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ExtraCustomizations;
};
