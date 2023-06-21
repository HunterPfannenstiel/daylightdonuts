import { CategoryExtras, ExtraCustomizations } from "@_types/admin/modify-menu";
import Extra from "components/admin/ui/ModifyMenu/Extra";

const ExtraPage = async () => {
  const cusomizations = await fetchExtraCustomizations();
  const extras = await fetchExtras();
  return <Extra customizations={cusomizations} extras={extras} />;
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

const fetchExtras = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/extra/fetch-extras`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as CategoryExtras[];
};
