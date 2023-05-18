import { OrderMetadata } from "@_types/payment";
import { verifyOrder } from "@_utils/payment/create-order/queries";
import { createVerify } from "crypto";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      console.log(req);
      return res.status(200);
    } else if (req.method === "POST") {
      console.log("body", req.body);
      console.log("header", req.headers);
      // const response = await fetch(
      //   "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       transmission_id: req.headers["paypal-transmission-id"],
      //       transmission_time: req.headers["paypal-transmission-time"],
      //       cert_url: req.headers["paypal-cert-url"],
      //       auth_algo: req.headers["paypal-auth-algo"],
      //       transmission_sig: req.headers["paypal-transmission-sig"],
      //       webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      //       webhook_event: req.body,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${process.env.PAYPAL_CLIENT_SECRET}`,
      //     },
      //   }
      // );
      const response = await fetch(req.headers["paypal-cert-url"] as string);
      const certificate = await response.json();
      const verifier = createVerify(req.headers["paypal-auth-algo"] as string);
      verifier.update(
        (req.headers["paypal-transmission-id"] as string) +
          req.headers["paypal-transmission-time"] +
          process.env.PAYPAL_WEBHOOK_ID +
          JSON.stringify(req.body),
        "utf8"
      );
      const isSigValid = verifier.verify(
        certificate,
        req.headers["paypal-transmission-sig"] as string,
        "base64"
      );
      if (isSigValid) {
        console.log("Sig is valid!");
        const { cartId, subtotal, tax, total } = (await JSON.parse(
          req.body.custom_id
        )) as OrderMetadata;
        console.log("ORDER METADATA", { cartId, subtotal, tax, total });
        await verifyOrder(
          +cartId,
          +subtotal,
          +tax,
          +total,
          1,
          req.body?.resource?.id
        );
        return res.status(200).json({ message: "Complete" });
      } else {
        console.log("SIGNATURE IS NOT VALID");
        res.status(400).json({ message: "Unauthorized" });
      }

      // const data = await response.json();
      // if (data.verification_status === "SUCCESS") {
      //   const { cartId, subtotal, tax, total } = (await JSON.parse(
      //     req.body.custom_id
      //   )) as OrderMetadata;
      //   console.log("ORDER METADATA", { cartId, subtotal, tax, total });
      //   await verifyOrder(
      //     +cartId,
      //     +subtotal,
      //     +tax,
      //     +total,
      //     1,
      //     req.body?.resource?.id
      //   );
      //   return res.status(200).json({ message: "Complete" });
      // } else {
      //   return res.status(500).json({ message: "Not able to verify" });
      // }
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error" });
  }
};

export default handler;
