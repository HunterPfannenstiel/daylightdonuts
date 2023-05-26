import { Customizations } from "@_types/admin/forms";
import ModifyMenu from "components/admin/ui/ModifyMenu/ModifyMenu";

const Menu = async () => {
  const customizations = await fetchMenuCusomizations();
  return <ModifyMenu customizations={customizations} />;
};

const fetchMenuCusomizations = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/customizations`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data as Customizations;
};

export default Menu;
