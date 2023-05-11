import { NewCartItem, UpdateDB } from "@_types/database/cart";
import { customerQuery } from "../connect";

export const createNewCart = async (items?: NewCartItem[]): Promise<number> => {
  const query = "CALL store.create_cart(NULL, $1)";
  const res = await customerQuery(query, [items || null]);
  return res.rows[0].id;
};

export const updateCart = async (cartId: number, items: UpdateDB) => {
  const query = "CALL store.update_cart($1, $2)";
  await customerQuery(query, [cartId, items.items]);
};
