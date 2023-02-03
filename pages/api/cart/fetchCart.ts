import { DBCartItem } from "@_types/database/cart";
import { getUserCart } from "@_utils/database/cart/queries";
import { NextApiHandler } from "next";
import {
  clearCartCookie,
  getCartCookieId,
  isValidCartId,
} from "@_utils/database/cart/cookies";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    let cartId = getCartCookieId(req.cookies);

    let savedCart: DBCartItem[] = [];
    if (cartId) {
      if (await isValidCartId(cartId)) {
        try {
          savedCart = await getUserCart(cartId);
        } catch (e: any) {
          res.status(400).json({ message: e.message });
          return;
        }
      } else {
        console.log("Invalid cartId");
        clearCartCookie(res);
      }
    }
    res.status(200).json(savedCart);
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
