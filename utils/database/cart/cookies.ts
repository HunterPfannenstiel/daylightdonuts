import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { CartToken } from "@_types/database/cart";
import { customerQuery } from "../connect";

export const setCartCookie = (res: NextApiResponse, cartId: number) => {
  const cartToken = jwt.sign({ cartId }, process.env.JWT_PASSWORD!);
  let date = new Date();
  const oneMonth = new Date(date.setMonth(date.getMonth() + 1)).toUTCString();
  console.log(cartId);
  res.setHeader("set-cookie", `cartToken=${cartToken}; expires=${oneMonth};`);
};

export const clearCartCookie = (res: NextApiResponse) => {
  res.setHeader(
    "set-cookie",
    `cartToken=${""}; expires=${new Date(2000).toUTCString()}`
  );
};

export const getCartCookieId = (
  cookies: Partial<{
    [key: string]: string;
  }>
) => {
  const { cartToken } = cookies;
  if (cartToken) {
    const { cartId } = jwt.verify(
      cartToken,
      process.env.JWT_PASSWORD!
    ) as CartToken;
    return +cartId;
  }
  return null;
};

export const isValidCartId = async (cartId: number) => {
  try {
    const query = "SELECT * FROM store.check_cart_status($1)";
    const res = await customerQuery(query, [cartId]);
    if (res.rows.length === 0) throw new Error("Unexpected Response");
    return res.rows[0].status as "Complete" | "Pending" | "Open";
  } catch (error) {
    throw new Error("There was an error while retrieving cart process!");
  }
};
