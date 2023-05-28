import { Customizations, ImageUpload, NewDBItem } from "@_types/admin/forms";
import { adminQuery } from "../connect";
import { parseUndefinedToNull } from "@_utils/index";

export const createNewMenuItem = async (
  item: NewDBItem,
  images: ImageUpload[]
) => {
  const groupingId = parseUndefinedToNull(item.groupingId);
  const extraGroups = parseUndefinedToNull(item.extraGroups)
    ? JSON.parse(item.extraGroups!)
    : null;
  const categories = parseUndefinedToNull(item.categories)
    ? JSON.parse(item.categories!)
    : null;
  const subcategories = parseUndefinedToNull(item.subcategories)
    ? JSON.parse(item.subcategories!)
    : null;
  const avaiableWeekdays = parseUndefinedToNull(item.availableWeekdays)
    ? JSON.parse(item.availableWeekdays!)
    : null;
  const availabilityRange = parseUndefinedToNull(item.availabilityRange);
  const imageDisplayOrders = parseUndefinedToNull(item.imageDisplayOrders)
    ? JSON.parse(item.imageDisplayOrders!)
    : null;
  const displayImage = images.splice(0, 1);
  const extraImages = images.length > 0 ? images : null;
  extraImages?.forEach((img, i, arr) => {
    arr[i].displayOrder = imageDisplayOrders[i];
  });
  const query =
    "CALL store.create_menu_item($1, $2, $3, $4, NULL, $5, $6, $7, $8, $9, $10, $11)";
  const res = await adminQuery(query, [
    item.name,
    item.price,
    displayImage,
    item.description,
    groupingId,
    extraGroups,
    categories,
    subcategories,
    avaiableWeekdays,
    availabilityRange,
    extraImages,
  ]);
  return res.rows[0]?.item_id as number;
};

export const fetchItemCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_item_customizations()";
  const res = await adminQuery(query);
  return res.rows[0] as Customizations;
};
