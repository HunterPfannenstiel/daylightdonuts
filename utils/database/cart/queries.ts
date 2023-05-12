import { DBCartItem } from "@_types/database/cart";
import { customerQuery } from "../connect";

export const getUserCart = async (cartId: string) => {
  const query = "SELECT * FROM store.view_cart($1)";

  const res = await customerQuery(query, [cartId]);
  return res.rows as DBCartItem[];
};
