import { Customizations, NewDBItem } from "@_types/admin/forms";
import { adminQuery } from "../connect";

export const createNewMenuItem = async (item: NewDBItem, imageUrl: string) => {
  const query =
    "CALL store.create_menu_item($1, $2, $3, $4, NULL, $5, $6, $7, $8, $9, $10)";
  const res = await adminQuery(query, [
    item.name,
    item.price,
    imageUrl,
    item.description,
    item.groupingId,
    JSON.parse(item.extraGroups),
    JSON.parse(item.categories),
    JSON.parse(item.subcategories),
    JSON.parse(item.availableWeekdays),
    item.availabilityRange === "undefined" ? null : item.availabilityRange,
  ]);
  return res.rows[0]?.item_id as number;
};

export const fetchItemCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_item_customizations()";
  const res = await adminQuery(query);
  return res.rows[0] as Customizations;
};
