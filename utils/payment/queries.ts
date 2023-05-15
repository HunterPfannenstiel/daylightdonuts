import { TotalCart } from "@_types/database/checkout";
import { EligibleDozen, OrderItem } from "@_types/payment";
import { customerQuery } from "@_utils/database/connect";

export const getOrderItems = async (cartId: string) => {
  const query = `SELECT cart_item.amount, menu_item.name, menu_item.price AS unitprice,
  array_agg(json_strip_nulls(json_build_object('category', extra_category.name, 'extra', extra.name))) AS extras,
  array_remove(array_agg(extra.price::numeric), NULL) AS extra_prices
  FROM cart 
  LEFT JOIN cart_item USING (cart_id)
  JOIN menu_item USING (menu_item_id)
  LEFT JOIN cart_extras USING (cart_id, cart_item_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category USING (extra_category_id)
  WHERE cart_id = $1
  GROUP BY 1, 2, 3, cart_item.cart_item_id;`;
  const result = (await customerParamQuery(query, [cartId])) as OrderItem[];
  return result;
};

export const getEligibleDozens = async (cartId: string) => {
  const query = `SELECT json_build_object('price', t1.price::numeric, 'amount', SUM(t1.amount), 'size', t1.size, 
  'itemPrice', t1.unitprice::numeric) AS eligibledozen FROM (
  SELECT menu_item.price AS unitprice, 
  cart_item.amount, dozenable.price, dozenable.size, array_agg(extra.price) AS extra_prices
  FROM cart 
  LEFT JOIN cart_item USING (cart_id)
  JOIN menu_item USING (menu_item_id)
  LEFT JOIN cart_extras USING (cart_id, cart_item_id)
  LEFT JOIN extra USING (extra_id)
  LEFT JOIN extra_category USING (extra_category_id)
  JOIN dozenable USING (dozenable_id)
  WHERE cart_id = $1
  GROUP BY 1, 2, 3, 4, cart_item.cart_item_id) AS t1
  WHERE TRUE = ALL (SELECT UNNEST(t1.extra_prices) IS NULL)
  GROUP BY t1.price, t1.size, t1.unitprice;`;
  const result = (await customerParamQuery(query, [cartId])) as EligibleDozen[];
  return result;
};

export const getStripeId = async (cartId: number): Promise<string | null> => {
  const query = "SELECT * FROM store.retrieve_stripe_id($1)";

  const res = await customerQuery(query, [cartId]);
  if (res.rows.length === 0) return null;
  return res.rows[0].payment_uid;
};

export const setPaymentId = async (cartId: number, paymentId: string) => {
  const query = "CALL store.insert_stripe_uid($1, $2)";

  await customerQuery(query, [cartId, paymentId]);
};

export const setError = async (cartId: string) => {
  const query = `UPDATE ${'"order"'} SET error = true WHERE cart_id = $1`;
  await customerParamQuery(query, [cartId]);
};

export const getTotalingCart = async (cartId: number) => {
  const query = "SELECT * FROM store.fetch_totaling_cart($1)";
  const res = await customerQuery(query, [cartId]);
  return res.rows[0] as { cart: TotalCart[]; tax_amount: string };
};
