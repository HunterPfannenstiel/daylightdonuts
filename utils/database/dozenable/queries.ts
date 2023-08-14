import { Item } from "@_types/database/menu";
import { DozenableDBResponse } from "@_types/dozenable";
import { customerQuery } from "../connect";

export const getGroupNames = async () => {
  const query = "SELECT * FROM store.fetch_grouping_names()";
  const res = await customerQuery(query);
  return res.rows[0].names as string[];
};

export const getAllItemsForGroup = async (groupName: string) => {
  const query = "SELECT * FROM store.fetch_group_item_details($1)";

  const infoQuery = "SELECT * FROM store.fetch_group_info($1)";

  const itemRes = await customerQuery(query, [groupName]);
  const items = itemRes.rows as Item[];
  const groupRes = await customerQuery(infoQuery, [groupName]);
  if (groupRes.rows.length === 0) throw new Error("Group name was not found");
  return { groupInfo: groupRes.rows[0] as DozenableDBResponse, items };
};
