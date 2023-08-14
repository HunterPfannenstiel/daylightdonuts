import { DBEntity, GroupingItem } from "@_types/admin/modify-menu";
import ItemGrouping from "components/admin/ui/ModifyMenu/ItemGrouping";
import ModifyMenu from "custom-objects/ModifyMenu";

const ItemGroupingPage = async () => {
  const customizations = await fetchItemGroupingCustomizations();
  const groupings = await fetchItemGroupings();

  return <ItemGrouping customizations={customizations} groupings={groupings} />;
};

export default ItemGroupingPage;

const fetchItemGroupingCustomizations = async () => {
  const res = await ModifyMenu.Get.Customizations<GroupingItem[]>(
    "item-grouping"
  );
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};

const fetchItemGroupings = async () => {
  const res = await ModifyMenu.Get.Existing<DBEntity[]>("item-grouping");
  if (!res.success) {
    throw new Error(res.errorMessage);
  }
  return res.data;
};
