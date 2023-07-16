import { Customizations } from "@_types/admin/forms";
import { Item } from "@_types/admin/modify-menu";
import CreateExtraModal from "components/admin/ui/ModifyMenu/Extra/CreateModal";
import ModifyMenu from "components/admin/ui/ModifyMenu";
import APIRequest from "custom-objects/Fetch";

const Menu = async () => {
  const items = await fetchItems();
  const { groupings, extra_groupings, item_categories } =
    await fetchMenuCustomizations();
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
  const res = await APIRequest.pageRequest<Item[]>(
    "/api/admin/modify-menu/fetch-items"
  );

  if (!res.success) {
    throw new Error(res.errorMessage);
  }

  return res.data;
};

const fetchMenuCustomizations = async () => {
  const res = await APIRequest.pageRequest<Customizations>(
    "/api/admin/modify-menu/customizations"
  );
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

export default Menu;
