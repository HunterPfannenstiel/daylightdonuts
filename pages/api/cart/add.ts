import { NewCartItem } from "@_types/database/cart";
import { getCartCookieId, setCartCookie } from "@_utils/database/cart/cookies";
import { addNewItems, createNewCart } from "@_utils/database/cart/updateDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let cartId = getCartCookieId(req.cookies);
    if (!cartId) {
      cartId = setCartCookie(res);
      await createNewCart(cartId);
    }
    const items = req.body?.items as NewCartItem[] | undefined;
    if (items) {
      try {
        await addNewItems(cartId, items);
      } catch (e) {
        res.status(500).json({ error: e });
        return;
      }
    } else {
      res.status(400).json({ error: "No items were given to add to cart!" });
      return;
    }

    res.status(200).json({ message: "Added new items to cart!" });
  } else {
    res.status(405);
  }
};

export default handler;
