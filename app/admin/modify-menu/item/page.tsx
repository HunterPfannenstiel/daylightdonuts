import { Customizations } from "@_types/admin/forms";
import { Item as ItemT } from "@_types/admin/modify-menu";
import Item from "components/admin/ui/ModifyMenu/Item";
import ModifyMenu from "custom-objects/ModifyMenu";

const Menu = async () => {
  const items = await fetchItems();
  const { groupings, extra_groupings, item_categories } =
    await fetchMenuCusomizations();
  return (
    <Item
      items={items}
      groupings={groupings}
      extraGroupings={extra_groupings}
      itemCategories={item_categories}
    />
  );
};

const fetchItems = async () => {
  return (await ModifyMenu.Get.Existing("item")) as ItemT[];
};

const fetchMenuCusomizations = async () => {
  return (await ModifyMenu.Get.Customizations("item")) as Customizations;
};

export default Menu;
