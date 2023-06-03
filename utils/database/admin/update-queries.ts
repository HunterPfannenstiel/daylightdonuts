import {
  Customizations,
  ImageUpload,
  InitialItemSelections,
  ItemImage,
  ModifyItem,
  NewDBItem,
} from "@_types/admin/forms";
import { adminQuery } from "../connect";
import { parseUndefinedToNull } from "@_utils/index";
import { Item } from "@_types/admin/modify-menu";
import { ServerError } from "custom-objects/ServerError";

//Complex because formData must be sent to endpoint when working with images
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
  const imageDisplayOrders = parseUndefinedToNull(item.newImageDisplayOrder)
    ? JSON.parse(item.newImageDisplayOrder!)
    : null;
  const newImages = getNewImageDisplayOrders(imageDisplayOrders, images);
  const displayImage = newImages.find((img) => img.displayOrder === 0);
  const extraImages = newImages.filter((img) => img.displayOrder !== 0);
  console.log(displayImage);
  console.log(extraImages);
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
    JSON.stringify(extraImages),
  ]);
  return res.rows[0]?.item_id as number;
};

export const modifyMenuItem = async (
  item: ModifyItem,
  images: ImageUpload[]
) => {
  let itemDetails = parseUndefinedToNull(item.itemDetails)
    ? JSON.parse(item.itemDetails!)
    : null;
  const addExtraGroups = parseUndefinedToNull(item.addExtraGroups)
    ? JSON.parse(item.addExtraGroups!)
    : null;
  const removeExtraGroups = parseUndefinedToNull(item.removeExtraGroups)
    ? JSON.parse(item.removeExtraGroups!)
    : null;
  const addCategories = parseUndefinedToNull(item.addCategories)
    ? JSON.parse(item.addCategories!)
    : null;
  const removeCategories = parseUndefinedToNull(item.removeCategories)
    ? JSON.parse(item.removeCategories!)
    : null;
  const addSubcategories = parseUndefinedToNull(item.addSubcategories)
    ? JSON.parse(item.addSubcategories!)
    : null;
  const removeSubcategories = parseUndefinedToNull(item.removeSubcategories)
    ? JSON.parse(item.removeSubcategories!)
    : null;
  const addWeekdays = parseUndefinedToNull(item.addWeekdays)
    ? JSON.parse(item.addWeekdays!)
    : null;
  const removeWeekdays = parseUndefinedToNull(item.removeWeekdays)
    ? JSON.parse(item.removeWeekdays!)
    : null;
  const removeImages = parseUndefinedToNull(item.removeExtraImages)
    ? JSON.parse(item.removeExtraImages!)
    : null;

  const imageDisplayOrders = parseUndefinedToNull(item.newImageDisplayOrder)
    ? JSON.parse(item.newImageDisplayOrder!)
    : null;
  const allImages = parseUndefinedToNull(item.initialImages)
    ? (JSON.parse(item.initialImages!) as ItemImage[])
    : [];

  allImages.push(...getNewImageDisplayOrders(imageDisplayOrders, images));
  const index = allImages.findIndex((img) => img.displayOrder === 0);
  if (index !== -1) {
    const image = allImages.splice(index, 1)[0];
    console.log("Display Image", image);
    if (itemDetails) {
      itemDetails["displayImage"] = image;
    } else {
      itemDetails = { displayImage: image };
    }
  }
  const query =
    "CALL store.modify_menu_item($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NULL)";

  const res = await adminQuery(query, [
    item.itemId,
    itemDetails,
    addExtraGroups,
    removeExtraGroups,
    addCategories,
    removeCategories,
    addSubcategories,
    removeSubcategories,
    addWeekdays,
    removeWeekdays,
    JSON.stringify(allImages),
    removeImages,
  ]);

  console.log("removed images", res.rows);
  return res.rows as string[];
};

export const fetchItemCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_item_customizations()";
  const res = await adminQuery(query);
  return res.rows[0] as Customizations;
};

export const fetchItems = async (
  phrase: string | string[] | undefined,
  includeArchived: boolean | null,
  includeInactive: boolean | null
) => {
  if (!phrase || typeof phrase !== "string") phrase = "";
  const query = "SELECT * FROM store.search_items($1, $2, $3)";
  const res = await adminQuery(query, [
    phrase,
    includeArchived,
    includeInactive,
  ]);

  return res.rows as Item[];
};

export const fetchItemSelections = async (itemId: number) => {
  const query = "SELECT * FROM store.fetch_item_selections($1)";
  const res = await adminQuery(query, [itemId]);
  if (res.rows.length < 1) {
    throw new ServerError("Item not found in the database", 400);
  }
  return res.rows[0] as InitialItemSelections;
};

const getNewImageDisplayOrders = (mapping: any, images: ImageUpload[]) => {
  return images.map((image) => {
    const displayOrder = mapping[image.name];
    return {
      imageUrl: image.imageUrl,
      publicId: image.publicId,
      displayOrder,
    } as ItemImage;
  });
};
