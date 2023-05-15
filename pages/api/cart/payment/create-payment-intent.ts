import { getCartCookieId } from "@_utils/database/cart/cookies";
import { calculateCartTotal } from "@_utils/payment/payment";
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
      const { subtotal, tax, total } = await calculateCartTotal(cartId);
      const stripeTotal = +(total * 100).toFixed(0);
      const paymentId = await getStripeId(cartId);
      let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
      if (paymentId) {
        console.log("PaymentId Found", paymentId);
        try {
          paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
          if (paymentIntent.amount !== stripeTotal) {
            paymentIntent = await stripe.paymentIntents.update(paymentId, {
              amount: stripeTotal,
            });
          }
        } catch (e: any) {
          console.log("There was an error, creating a new payment intent");
          paymentIntent = await createPaymentIntent(
            stripe,
            stripeTotal,
            subtotal,
            tax,
            total
          );
          setPaymentId(cartId, paymentIntent.id);
        }
      } else {
        paymentIntent = await createPaymentIntent(
          stripe,
          stripeTotal,
          subtotal,
          tax,
          total
        );
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

const createPaymentIntent = async (
  stripe: Stripe,
  amount: number,
  subtotal: number,
  tax: number,
  total: number
) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      subtotal,
      tax,
      total,
    },
  });

  return paymentIntent;
};

export default handler;
