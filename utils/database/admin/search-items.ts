import { DBEntity } from "@_types/admin/modify-menu";
import { adminQuery } from "../connect";

export const searchItems = async (
  phrase = "",
  date = new Date(),
  page = 0,
  pageSize = 12
) => {
  const query = "SELECT * FROM store.search_entity_items($1)";
  const res = await adminQuery(query, [phrase]);
  return res.rows as DBEntity[];
};
