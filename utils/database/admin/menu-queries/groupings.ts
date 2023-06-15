import {
  DBEntity,
  GroupingItem,
  GroupingSelections,
} from "@_types/admin/modify-menu";
import { adminQuery } from "@_utils/database/connect";
import { checkRowLength } from "./modify-item";

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
