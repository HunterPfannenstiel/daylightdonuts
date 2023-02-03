import { clearCartCookie } from "@_utils/database/cart/cookies";
import { NextApiHandler } from "next";
const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    console.log("REMOVED CART");
    clearCartCookie(res);
    res.status(200).end();
  } else {
    return res.status(400).end();
  }
};

export default handler;
