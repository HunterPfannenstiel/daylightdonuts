import { UpdateDB } from "@_types/database/cart";
import { getCartCookieId, setCartCookie } from "@_utils/database/cart/cookies";
import {
  addNewItems,
  createNewCart,
  updateItems,
} from "@_utils/database/cart/updateDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let cartId = getCartCookieId(req.cookies);
    if (!cartId) {
      console.log("No cartId, creating new");
      cartId = setCartCookie(res);
      await createNewCart(cartId);
    }

    const updates = req.body?.updates as UpdateDB | undefined;
    if (updates) {
      console.log("Found updates");
      console.log(updates);
      try {
        await addNewItems(cartId, updates.newItems);
        await updateItems(cartId, updates.updateItems);
      } catch (e: any) {
        console.log(e);
        res.status(500).json({ message: e });
        return;
      }
    } else {
      res.status(400).json({ message: "No cart updates were given" });
      return;
    }
    res.status(200).json({ message: "Successful" });
  }
};

export default handler;
