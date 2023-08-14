import { getCartCookieId } from "@_utils/database/cart/cookies";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const cartId = getCartCookieId(req.cookies);
    // if(cartId) await setError(cartId);

    res.status(200).end();
  } else {
    return res.status(400).end();
  }
};
export default handler;
