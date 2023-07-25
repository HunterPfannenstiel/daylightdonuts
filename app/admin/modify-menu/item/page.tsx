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
      initialItems={items}
      groupings={groupings}
      extraGroupings={extra_groupings}
      itemCategories={item_categories}
    />
  );
};

const fetchItems = async () => {
  const res = await ModifyMenu.Get.Existing<ItemT[]>("item");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

const fetchMenuCusomizations = async () => {
  const res = await ModifyMenu.Get.Customizations<Customizations>("item");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

export default Menu;
