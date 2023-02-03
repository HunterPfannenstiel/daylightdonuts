import { NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { CartToken } from "@_types/database/cart";

const handler: NextApiHandler = (req, res) => {
  const { cookies } = req;
  if (cookies.cartToken) {
    try {
      const { cartId } = jwt.verify(
        cookies.cartToken,
        process.env.JWT_PASSWORD!
      ) as CartToken;
      res.status(200).json({ cartId });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  } else {
    res.status(400).json({ message: "No cart token found" });
  }
};

export default handler;
