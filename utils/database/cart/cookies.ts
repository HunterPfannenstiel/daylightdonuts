import { NextApiResponse } from "next";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { CartToken } from "@_types/database/cart";
import { customerParamQuery } from "../connect";

export const setCartCookie = (res: NextApiResponse) => {
  const cartId = v4();
  const cartToken = jwt.sign({ cartId }, process.env.JWT_PASSWORD!);
  let date = new Date();
  const oneMonth = new Date(date.setMonth(date.getMonth() + 1)).toUTCString();
  console.log(cartId);
  res.setHeader("set-cookie", `cartToken=${cartToken}; expires=${oneMonth};`);
  return cartId;
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
    try {
      const { cartId } = jwt.verify(
        cartToken,
        process.env.JWT_PASSWORD!
      ) as CartToken;
      return cartId;
    } catch (e) {
      console.log(e);
    }
  }
  return "";
};

export const isValidCartId = async (cartId: string) => {
  // const orderQuery = `SELECT order_id FROM public.${"order"} WHERE cart_id = $1;`;
  // const orderId = (await customerParamQuery(orderQuery, [cartId]))[0];
  const query = `SELECT last_modified, error, verified FROM cart LEFT JOIN public.${"order"} USING (cart_id) WHERE cart_id = $1`;
  const response = (await customerParamQuery(query, [cartId]))[0] as {
    last_modified: string | null;
    error: boolean | null;
    verified: boolean | null;
  };
  console.log("isValidResponse", response);
  //If there was no last_modified that means the cart id wasn't created by the application
  if (
    !response ||
    !response.last_modified ||
    response.verified ||
    response.error === false
  ) {
    return false;
  } else {
    return true;
  }
};
