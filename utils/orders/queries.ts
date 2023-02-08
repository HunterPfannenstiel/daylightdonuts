import { DateRange, DBOrder } from "@_types/admin/orders";
import { customerQuery } from "@_utils/database/connect";
import pgEscape from "pg-escape";

export const getOrdersByRange = async (range: DateRange) => {
  const query = `SELECT t1.order_id, t1.name, t1.email, t1.date, t1.time, t1.location, t1.printed, t1.payment_processor, t1.payment_id,
  t1.last_modified,
  json_agg(json_build_object('amount', t1.amount, 'name', t1.menu_name, 'extras', t1.extras)) AS order_contents FROM 
  (SELECT CONCAT(first_name, ' ', last_name) AS name, email, payment_processor, payment_id, last_modified,
  CONCAT(TO_CHAR(pickup_date, 'Day'), EXTRACT(MONTH FROM pickup_date), '/', EXTRACT(DAY FROM pickup_date)) AS date, 
  TO_CHAR(pickup_time, 'HH:MI AM') AS time, printed,
  cart_item.amount, menu_item.name AS menu_name, "order".order_id, "order".location,
  array_agg(json_strip_nulls(json_build_object('category', extra_category.name, 'extra', extra.name))) AS extras  
  FROM public."order" 
  JOIN cart USING(cart_id)
  LEFT JOIN cart_item USING (cart_id)
  JOIN menu_item USING (menu_item_id)
  LEFT JOIN cart_extras USING (cart_id, cart_item_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category USING (extra_category_id)
  ${getRangeStatement(range)}
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12) AS t1
  GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;`;

  const orders = (await customerQuery(query)) as DBOrder[];
  return orders;
};

export const getRangeStatement = (range: DateRange) => {
  if (range.startDate === range.endDate) {
    return `WHERE pickup_date = DATE('${pgEscape(range.startDate)}')`;
  } else {
    return `WHERE pickup_date >= DATE('${pgEscape(
      range.startDate
    )}') AND pickup_date <= DATE('${pgEscape(range.endDate)}')`;
  }
};
