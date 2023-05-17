import { NextApiHandler } from "next";
import PayPal from "@paypal/checkout-server-sdk";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { createOrder } from "@_utils/payment/create-order/queries";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const cartId = getCartCookieId(req.cookies);
      const { orderId, customerInfo } = req.body;
      const request = new PayPal.orders.OrdersCaptureRequest(orderId);
      //create order
      const info = {
        cartId,
        ...customerInfo,
      };
      await createOrder(info);
      console.log(request);
    } catch (e: any) {
      console.log(e);
      res.status(400).json({ message: e.message });
      return;
    }
    res.status(200).end();
  } else {
    return res.status(400).end();
  }
};
export default handler;
