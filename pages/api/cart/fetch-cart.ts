import { DBCartItem } from "@_types/database/cart";
import { viewCart } from "@_utils/database/cart/queries";
import { NextApiHandler } from "next";
import {
  clearCartCookie,
  getCartCookieId,
  isValidCartId,
} from "@_utils/database/cart/cookies";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let cartId = getCartCookieId(req.cookies);
      let isPending = false;
      let savedCart: DBCartItem[] = [];
      if (cartId) {
        const status = await isValidCartId(cartId);
        if (status !== "Complete") {
          status === "Pending" ? (isPending = true) : (isPending = false);
          savedCart = await viewCart(cartId);
        } else {
          console.log("Invalid cartId");
          clearCartCookie(res);
        }
      }
      res.status(200).json({ cart: savedCart, isPending });
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default handler;
