import { DBCartItem } from "@_types/database/cart";
import { customerQuery } from "../connect";
import { checkRowLength } from "../admin/menu-queries/modify-item";
import { CartDBResponse } from "@_types/cart";

export const viewCart = async (cartId: number) => {
  const query = "SELECT * FROM store.view_cart($1)";

  const res = await customerQuery(query, [cartId]);
  return res.rows as DBCartItem[];
};

export const getUserCart = async (cartId: number) => {
  const query = "SELECT * FROM store.get_cart($1)";
  const res = await customerQuery(query, [cartId]);
  checkRowLength(res);
  return res.rows[0] as CartDBResponse;
};
