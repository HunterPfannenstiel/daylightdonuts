import { OrderMetadata } from "@_types/payment";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      console.log(req);
      return res.status(200);
    } else if (req.method === "POST") {
      console.log("body", req.body);
      console.log("header", req.headers);
      const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
        {
          method: "POST",
          body: JSON.stringify({
            transmission_id: req.headers["paypal-transmission-id"],
            transmission_time: req.headers["paypal-transmission-time"],
            cert_url: req.headers["paypal-cert-url"],
            auth_algo: req.headers["paypal-auth-algo"],
            transmission_sig: req.headers["paypal-transmission-sig"],
            webhook_id: process.env.PAYPAL_WEBHOOK_ID,
            webhook_event: req.body,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYPAL_CLIENT_SECRET}`,
          },
        }
      );
      console.log("Response", response);
      const data = await response.json();
      if (data.verification_status === "SUCCESS") {
        console.log("IMPLEMENT CONFIRM ORDER");
        const metadata = (await JSON.parse(
          req.body.custom_id
        )) as OrderMetadata;
        //confirm order
      }
      return res.status(200).json({ message: "Complete" });
      // process.env.PAYPAL_WEBHOOK_ID
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

export default handler;
