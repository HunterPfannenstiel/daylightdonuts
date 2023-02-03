import { NextApiHandler } from "next";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

const handler: NextApiHandler = (req, res) => {
  const { cookies } = req;
  let { cartToken } = cookies;
  if (!cookies.cartToken) {
    const cartId = v4();
    cartToken = jwt.sign({ cartId }, process.env.JWT_PASSWORD!);
    res
      .setHeader("set-cookie", `cartToken=${cartToken}`)
      .status(200)
      .json({ cartToken });
  } else {
    res.status(200).json({ cartToken });
  }
};

export default handler;
