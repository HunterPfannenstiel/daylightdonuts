import { NextApiHandler } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { verifyOrder } from "@_utils/payment/create-order/queries";
import { OrderMetadata } from "@_types/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") return res.status(200);
  if (req.method === "POST") {
    let rawBody = await buffer(req);
    let event: Stripe.Event;
    const endpointSecret = process.env.STRIPE_WH_SECRET!;
    const signature = req.headers["stripe-signature"];
    try {
      if (signature) {
        event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          endpointSecret
        );
      } else {
        throw new Error("Signature is undefined");
      }
    } catch (e: any) {
      console.log("⚠️  Webhook signature verification failed.", e.message);
      res.status(400).send("Failed Sig");
      return;
    }
    const paymentIntent = event.data
      .object as Stripe.Response<Stripe.PaymentIntent>;

    console.log(paymentIntent);
    let feeDetails: { amount: number }[] = [];
    try {
      feeDetails = await getStripeFee(paymentIntent.id);
    } catch (error) {
      console.log("Could not get fee info");
    }
    //Post to DB
    try {
      const fee = feeDetails.reduce((fee, currVal) => {
        return { amount: currVal.amount + fee.amount };
      });
      const { subtotal, tax, total, cartId } =
        paymentIntent.metadata as OrderMetadata;
      console.log("ORDER METADATA", paymentIntent.metadata);
      await verifyOrder(
        +cartId,
        +subtotal,
        +tax,
        +total,
        1,
        paymentIntent.id,
        +(fee.amount / 100).toFixed(2)
      );
    } catch (e: any) {
      console.log(e);
      res.status(500).send("Unexpected error");
      return;
    }
    res.status(200).end();
  }
};

export default handler;

const getStripeFee = async (paymentIntentId: string) => {
  const paymentIntent = (await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge.balance_transaction"],
  })) as any;
  if (!paymentIntent) return undefined;
  const feeDetails =
    paymentIntent?.latest_charge?.balance_transaction?.fee_details;
  console.log("Fee details", feeDetails);
  return feeDetails;
};
