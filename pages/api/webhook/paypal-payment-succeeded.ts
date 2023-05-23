import { OrderMetadata } from "@_types/payment";
import { setOrderError } from "@_utils/database/checkout";
import { verifyOrder } from "@_utils/payment/create-order/queries";
import { verifyPayPalWebhook } from "@_utils/payment/paypal";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  let orderMetadata: OrderMetadata | undefined = undefined;
  try {
    if (req.method === "GET") {
      console.log(req);
      return res.status(200);
    } else if (req.method === "POST") {
      console.log("body", req.body);
      console.log("header", req.headers);
      console.log("Webhook Id", process.env.PAYPAL_WEBHOOK_ID);
      try {
        console.log("Custom Id", req.body.resource.custom_id);
        orderMetadata = await JSON.parse(req.body.resource.custom_id);
      } catch (error) {
        console.log("Couldnt parse order info from custom id");
      }
      const isVerified = await verifyPayPalWebhook(req);
      if (isVerified) {
        if (orderMetadata) {
          const { cartId, subtotal, tax, total } = orderMetadata;
          await verifyOrder(
            +cartId,
            +subtotal,
            +tax,
            +total,
            1,
            req.body?.resource?.id
          );
        }
        console.log("ORDER METADATA", orderMetadata);

        return res.status(200).json({ message: "Complete" });
      } else {
        return res.status(500).json({ message: "Not able to verify" });
      }
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    console.log(error);
    if (orderMetadata) setOrderError(+orderMetadata.cartId, error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
