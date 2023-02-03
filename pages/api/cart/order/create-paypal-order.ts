import { NextApiHandler } from "next";
import PayPal from "@paypal/checkout-server-sdk";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { orderId } = req.body;
      const request = new PayPal.orders.OrdersCaptureRequest(orderId);
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
