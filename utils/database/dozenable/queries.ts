import { Item } from "@_types/database/menu";
import { DozenableDBResponse } from "@_types/dozenable";
import { customerParamQuery } from "../connect";

export const getGroupNames = async () => {
  const names = (await customerParamQuery(
    "SELECT array_agg(name) AS names FROM dozenable;",
    []
  )) as [{ names: string[] }];
  return names[0].names;
};

export const getAllItemsForGroup = async (groupName: string) => {
  const query = `SELECT t2.id, t2.name, t2.price, t2.description, t2.image, t2.dozenprice, t2.groupname, t2.groupsize, json_agg(t2.extras) AS extras, 
  json_build_object('availableRange', array_agg(t2.available_range), 'availableDays', array_agg(t2.day_of_week)) AS availability FROM (
  SELECT t1.id, t1.name, t1.price, t1.description, t1.image, t1.dozenprice, t1.groupname, t1.groupsize, json_build_object('category', t1.category, 'extras', extras) AS extras,
  t1.available_range, t1.day_of_week FROM (
  SELECT menu_item.menu_item_id AS id, menu_item.name, menu_item.price,
  menu_item.description, menu_item.image, dozenable.price AS dozenprice, dozenable.name AS groupname, dozenable.size AS groupsize,
  extra_category.name AS category,
  json_agg(json_build_object('name', extra.name, 'price', extra.price, 'id', extra.extra_id)) AS extras,
  available_days.available_range, available_days.day_of_week
  FROM menu_item
  LEFT JOIN available_days USING (menu_item_id)
  JOIN dozenable USING (dozenable_id)
  LEFT JOIN item_group USING (menu_item_id)
  LEFT JOIN groupings USING (group_id)
  LEFT JOIN group_extra USING (group_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category ON groupings.category_id = extra_category.extra_category_id
  WHERE dozenable.name = $1
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12) AS t1) AS t2
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8;`;

  const infoQuery = `SELECT json_build_object('name', name, 'price', price, 'size', size) AS group FROM dozenable
  WHERE name = $1;`;

  const items = (await customerParamQuery(query, [groupName])) as Item[];
  const groupInfo = (await customerParamQuery(infoQuery, [
    groupName,
  ])) as DozenableDBResponse[];
  return { groupInfo: groupInfo[0].group, items };
};
