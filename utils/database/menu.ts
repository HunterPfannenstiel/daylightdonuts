import { MenuItem, Item } from "@_types/database/menu";
import { customerQuery } from "./connect";
import { checkRowLength } from "./admin/menu-queries/modify-item";

export const getFilterItems = async (
  category: string | undefined | null,
  filter: string | undefined | null
): Promise<MenuItem[]> => {
  category = category === "All" || category === "undefined" ? null : category;
  filter = filter === "All" || filter === "undefined" ? null : filter;
  const query = "SELECT * FROM store.fetch_menu_items($1, $2)";
  const res = await customerQuery(query, [category, filter]);
  return res.rows;
};

export const getItemDetails = async (
  itemName: string | undefined
): Promise<Item | undefined> => {
  const query = "SELECT * FROM store.fetch_item_details($1)";
  const res = await customerQuery(query, [itemName]);
  checkRowLength(res);
  return res.rows[0];
};

export const getDozenableGroups = async (): Promise<MenuItem[]> => {
  const query = "SELECT * FROM store.fetch_groupings()";
  const res = await customerQuery(query);
  return res.rows;
};

export const getAllItemNames = async (): Promise<{ name: string }[]> => {
  const query = "SELECT * FROM store.fetch_menu_names()";
  const res = await customerQuery(query);
  return res.rows;
};

export const getAllCategoryNames = async (): Promise<{ name: string}[]> => {
  const query = "SELECT * FROM store.fetch_category_names()";
  const res = await customerQuery(query);
  return res.rows;
}
