import { getCartCookieId } from "@_utils/database/cart/cookies";
import { calculateOrderAmount } from "@_utils/payment/payment";
import { getStripeId, setPaymentId } from "@_utils/payment/queries";
import { NextApiHandler } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    let cartId = getCartCookieId(req.cookies);
    if (cartId) {
      const amount = await calculateOrderAmount(cartId);
      const paymentId = await getStripeId(cartId);
      let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
      if (paymentId) {
        console.log("PaymentId Found", paymentId);
        try {
          paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
          if (paymentIntent.amount !== amount) {
            paymentIntent = await stripe.paymentIntents.update(paymentId, {
              amount,
            });
          }
        } catch (e: any) {
          console.log("There was an error, creating a new payment intent");
          paymentIntent = await createPaymentIntent(stripe, amount);
        }
      } else {
        paymentIntent = await createPaymentIntent(stripe, amount);

        setPaymentId(cartId, paymentIntent.id);
      }
      res.status(200).send({ client_secret: paymentIntent.client_secret });
      return;
    } else {
      res.status(400).json({ message: "Cart was not found" });
      return;
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
};

const createPaymentIntent = async (stripe: Stripe, amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return paymentIntent;
};

export default handler;
