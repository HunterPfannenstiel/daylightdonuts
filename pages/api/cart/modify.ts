import { CartDatabaseUpdate } from "@_types/cart";
import { getCartCookieId, setCartCookie } from "@_utils/database/cart/cookies";
import { updateCart, createNewCart } from "@_utils/database/cart/updateDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let cartId = getCartCookieId(req.cookies);
    const updates = req.body?.updates as CartDatabaseUpdate[] | undefined;
    console.log({ updates });
    if (!cartId) {
      console.log("No cartId, creating new");
      console.log({ updates });
      cartId = await createNewCart(updates);
      setCartCookie(res, cartId);
    } else if (updates) {
      try {
        await updateCart(cartId, updates);
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
