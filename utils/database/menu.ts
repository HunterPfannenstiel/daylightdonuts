import { MenuItem, Item } from "@_types/database/menu";
import { customerParamQuery, customerQuery } from "./connect";

export const getFilterItems = async (
  category: string | undefined,
  filter: string | undefined
) => {
  let items: MenuItem[];
  if (
    category === "undefined" ||
    !category ||
    category.toLowerCase() === "all"
  ) {
    const query = `SELECT menu_item.name, menu_item.image, menu_item.price, 
    json_build_object('availableRange', array_agg(available_days.available_range), 'availableDays', array_agg(available_days.day_of_week)) AS availability FROM menu_item
    LEFT JOIN available_days USING (menu_item_id)
    GROUP BY 1, 2, 3;`;
    items = await customerQuery(query);
  } else if (
    filter === "undefined" ||
    !filter ||
    filter.toLowerCase() === "all"
  ) {
    const query = `SELECT menu_item.name, menu_item.image, menu_item.price, 
    json_build_object('availableRange', array_agg(available_days.available_range), 'availableDays', array_agg(available_days.day_of_week)) AS availability FROM menu_item
    LEFT JOIN available_days USING (menu_item_id)
    JOIN menu_item_category USING (menu_item_id) 
    JOIN item_category USING (item_category_id) 
    WHERE item_category.name = $1
    GROUP BY 1, 2, 3;`;
    items = await customerParamQuery(query, [category]);
  } else {
    const query = `SELECT menu_item.name, menu_item.image, menu_item.price, 
    json_build_object('availableRange', array_agg(available_days.available_range), 'availableDays', array_agg(available_days.day_of_week)) AS availability FROM menu_item
    LEFT JOIN available_days USING (menu_item_id)
    JOIN menu_item_subcategory USING (menu_item_id) 
    JOIN item_subcategory USING (item_subcategory_id) 
    JOIN item_category USING (item_category_id)
    WHERE item_category.name = $1 
    AND item_subcategory.name = $2 
    GROUP BY 1, 2, 3;`;
    items = await customerParamQuery(query, [category, filter]);
  }

  console.log(items);
  return items;
};

export const getItemDetails = async (itemName: string | undefined) => {
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
  LEFT JOIN dozenable USING (dozenable_id)
  LEFT JOIN item_group USING (menu_item_id)
  LEFT JOIN groupings USING (group_id)
  LEFT JOIN group_extra USING (group_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category ON groupings.category_id = extra_category.extra_category_id
  WHERE menu_item.name = $1
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12) AS t1) AS t2
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8;`;

  if (itemName) {
    const itemInfo = (await customerParamQuery(query, [itemName])) as Item[];
    return itemInfo;
  }
};

export const getDozenableGroups = async () => {
  const query =
    "SELECT dozenable.name, dozenable.image, dozenable.price FROM dozenable;";
  const items = (await customerQuery(query)) as MenuItem[];
  return items;
};

export const getAllItemNames = async () => {
  const itemNames = await customerQuery(
    "SELECT menu_item.name FROM menu_item;"
  );
  return itemNames as { name: string }[];
};
