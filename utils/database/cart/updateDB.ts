import { CartDatabaseUpdate } from "@_types/cart";
import { customerQuery } from "../connect";

export const createNewCart = async (
  items?: CartDatabaseUpdate[]
): Promise<number> => {
  const query = "CALL store.create_cart(NULL, $1)";
  const res = await customerQuery(query, [JSON.stringify(items) || null]);
  return res.rows[0].id;
};

export const updateCart = async (
  cartId: number,
  items: CartDatabaseUpdate[]
) => {
  const query = "CALL store.update_cart($1, $2)";
  await customerQuery(query, [cartId, JSON.stringify(items)]);
};
