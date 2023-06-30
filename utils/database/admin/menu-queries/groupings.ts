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

export type PostCreateItemGrouping = {
  name: string;
  price: string;
  size: number;
  menuItemIds: string; //JSON array
  image: Blob;
};

export type CreateItemGrouping = {
  name: string;
  price: string;
  size: number;
  image: ImageUpload;
  menuItemIds?: number[];
};

export const createItemGrouping = async (info: CreateItemGrouping) => {
  const query = "CALL store.create_item_grouping($1, $2, $3, $4, $5, NULL)";
  const res = await adminQuery(query, [
    info.name,
    info.price,
    info.size,
    info.image,
    info.menuItemIds || null,
  ]);

  return res.rows[0] as { new_id: number };
};

export type PostModifyItemGrouping = {
  groupingId: number;
  name?: string;
  price?: string;
  size?: string;
  image?: Blob;
  isActive?: boolean | string;
  addItemIds?: string; //JSON array
  removeItemIds?: string; //JSON array
};

export type ModifyItemGrouping = {
  groupingId: number;
  name?: string;
  price?: string;
  size?: number;
  image?: ImageUpload;
  isActive?: boolean;
  addItemIds?: number[];
  removeItemIds?: number[];
};

export const modifyItemGrouping = async (info: ModifyItemGrouping) => {
  const query =
    "CALL store.modify_item_grouping($1, $2, $3, $4, $5, $6, $7, $8, NULL)";
  const res = await adminQuery(query, [
    info.groupingId,
    info.name || null,
    info.price || null,
    info.size === undefined ? null : info.size,
    info.image || null,
    info.isActive === undefined ? null : info.isActive,
    info.addItemIds || null,
    info.removeItemIds || null,
  ]);
  return res.rows[0] as { removed_public_id: string | null };
};
