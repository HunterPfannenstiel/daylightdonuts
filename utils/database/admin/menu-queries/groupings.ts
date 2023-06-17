import {
  DBEntity,
  GroupingItem,
  GroupingSelections,
} from "@_types/admin/modify-menu";
import { adminQuery } from "@_utils/database/connect";
import { checkRowLength } from "./modify-item";
import { ImageUpload } from "@_types/admin/forms";

export const viewItemGroupings = async () => {
  const query = "SELECT * FROM store.view_item_groupings()";
  const res = await adminQuery(query);
  return res.rows as DBEntity[];
};

export const fetchItemGroupingItems = async (page = 0, pageSize = 10) => {
  const query = "SELECT * FROM store.view_item_grouping_items($1, $2)";
  const res = await adminQuery(query, [page, pageSize]);
  return res.rows as GroupingItem[];
};

export const fetchItemGroupingSelections = async (groupingId: number) => {
  const query = "SELECT * FROM store.view_item_grouping_selections($1)";
  const res = await adminQuery(query, [groupingId]);
  checkRowLength(res);
  return res.rows[0] as GroupingSelections;
};

export const createItemGrouping = async (
  name: string,
  price: string,
  size: number,
  image: ImageUpload,
  menuItemIds?: number[]
) => {
  const query = "CALL store.create_item_grouping($1, $2, $3, $4, $5, NULL)";
  const res = await adminQuery(query, [
    name,
    price,
    size,
    image,
    menuItemIds || null,
  ]);

  return res.rows[0] as { new_id: number };
};

export const modifyItemGrouping = async (
  groupingId: number,
  name?: string,
  price?: string,
  size?: number,
  image?: ImageUpload,
  isActive?: boolean,
  addItemIds?: number[],
  removeItemIds?: number[]
) => {
  const query =
    "CALL store.modify_item_grouping($1, $2, $3, $4, $5, $6, $7, $8, NULL)";
  const res = await adminQuery(query, [
    groupingId,
    name || null,
    price || null,
    size === undefined ? null : size,
    image || null,
    isActive === undefined ? null : isActive,
    addItemIds || null,
    removeItemIds || null,
  ]);
  return res.rows[0] as { removed_public_id: string | null };
};
