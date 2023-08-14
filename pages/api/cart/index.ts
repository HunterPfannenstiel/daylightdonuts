import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { Cart } from "@_types/cart";
import { getTaxAmount, getUserCart } from "@_utils/database/cart/queries";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const cartId = getCartCookieId(req.cookies);
      if (cartId) {
        const { items, status, tax } = await getUserCart(cartId);
        return res.status(200).json({
          items,
          price: "0",
          totalItems: 0,
          status,
          nextId: 0,
          tax,
        } as Cart);
      } else {
        const tax = await getTaxAmount();
        return res.status(200).json({
          items: {},
          price: "0",
          totalItems: 0,
          status: "New",
          nextId: 0,
          tax,
        } as Cart);
      }
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
