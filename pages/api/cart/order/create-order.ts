import { NextApiHandler } from "next";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { createOrder } from "@_utils/payment/create-order/queries";
import { CustomerInfo } from "@_types/database/checkout";
import { validateCustomerInfo } from "@_utils/payment";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const cartId = getCartCookieId(req.cookies);
      const customerInfo = req.body as CustomerInfo;
      if (!cartId) throw new Error("Please create a cart before checking out");
      validateCustomerInfo(customerInfo);
      const info = {
        cartId,
        ...customerInfo,
      };
      await createOrder(info);
      console.log("Created Order!");
      res.status(200).json({ message: "Complete" });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: e.message });
      return;
    }
  } else {
    return res.status(400).end();
  }
};
export default handler;
