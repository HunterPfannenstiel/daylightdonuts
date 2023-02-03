import { UpdatedCartItem } from "@_types/database/cart";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { updateItems } from "@_utils/database/cart/updateDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let cartId: string;
    if ((cartId = getCartCookieId(req.cookies))) {
      const items = req.body?.items as UpdatedCartItem[] | undefined;
      if (items) {
        try {
          await updateItems(cartId, items);
        } catch (e) {
          console.log(e);
          res.status(500).json({ error: e });
          return;
        }
      }
    } else {
      res.status(400).json({ error: "cartToken was not found" });
      return;
    }
    res.status(200).json({ message: "Cart successfully updated!" });
  } else {
    res.status(405);
  }
};

export default handler;
