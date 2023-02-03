import { DBCartItem } from "@_types/database/cart";
import { customerParamQuery } from "../connect";

export const getUserCart = async (cartId: string) => {
  const query = `SELECT cart_item.subtotal AS subtotal, cart_item.cart_item_id AS cartItemID, cart_item.menu_item_id AS menuItemId, cart_item.amount,
  cart_item.extra_price AS extraprice, menu_item.name, menu_item.price AS unitprice, menu_item.image, 
  dozenable.price AS groupprice, dozenable.name AS groupname, dozenable.size AS groupsize,
  array_agg(json_build_object('category', extra_category.name, 'extra', extra.name)) AS extras, array_agg(extra.extra_id) AS extraids, 
  json_build_object('availableRange', array_agg(available_days.available_range), 'availableDays', array_agg(available_days.day_of_week)) AS availability 
  FROM cart 
  LEFT JOIN cart_item USING (cart_id)
  JOIN menu_item USING (menu_item_id)
  LEFT JOIN available_days USING (menu_item_id)
  LEFT JOIN dozenable USING (dozenable_id)
  LEFT JOIN cart_extras USING (cart_id, cart_item_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category USING (extra_category_id)
  WHERE cart_id = $1
  GROUP BY 1,2,3,4,5,6,7,8,9,10,11
  ORDER BY cart_item.cart_item_id;`;

  const data = await customerParamQuery(query, [cartId]);
  return data as DBCartItem[];
};
