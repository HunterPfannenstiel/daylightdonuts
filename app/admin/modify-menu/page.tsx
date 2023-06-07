import { Customizations } from "@_types/admin/forms";
import { Item } from "@_types/admin/modify-menu";
import ModifyMenu from "components/admin/ui/ModifyMenu/ModifyMenu";

const Menu = async () => {
  const items = await fetchItems();
  const { groupings, extra_groupings, item_categories } =
    await fetchMenuCusomizations();
  return (
    <>
      <ModifyMenu
        items={items}
        groupings={groupings}
        extraGroupings={extra_groupings}
        itemCategories={item_categories}
      />
    </>
  );
};

const fetchItems = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/fetch-items`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data as Item[];
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
