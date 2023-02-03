import { NextApiHandler } from "next";
import PayPal from "@paypal/checkout-server-sdk";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { calculateOrderAmount } from "@_utils/payment/payment";
import {
  getItemsForPaypal,
  getPurchaseUnitsAmountDetails,
  getReducedPriceFromDozens,
} from "@_utils/payment/paypal";
import { getEligibleDozens, getOrderItems } from "@_utils/payment/queries";

/*UNCOMMENT THIS WHEN IN PRODUCTION*/
// const Environment =
//   process.env.NODE_ENV === "production"
//     ? PayPal.core.LiveEnvironment
//     : PayPal.core.SandboxEnvironment;

// const paypalClient = new PayPal.core.PayPalHttpClient(
//   new Environment(
//     process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
//     process.env.PAYPAL_CLIENT_SECRET!
//   )
// );

const paypalClient = new PayPal.core.PayPalHttpClient(
  new PayPal.core.SandboxEnvironment(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!
  )
);

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const cartId = getCartCookieId(req.cookies);
    if (cartId) {
      const dozenDiscountedPrice = (
        (await calculateOrderAmount(cartId)) / 100
      ).toFixed(2);

      //The request is the 'thing we want to do'
      const request = new PayPal.orders.OrdersCreateRequest();
      //This makes sure the pop-up section works properly
      const orderItems = await getOrderItems(cartId);
      const eligbileDozenItems = await getEligibleDozens(cartId);
      const dozenDiscount = getReducedPriceFromDozens(eligbileDozenItems);
      const [paypalItems, total] = getItemsForPaypal(orderItems);
      const totalCartPrice = (+total - +dozenDiscount).toFixed(2);
      if (totalCartPrice !== dozenDiscountedPrice) {
        console.error(
          `Front-end cart calculated incorrect price, correct price: ${totalCartPrice}, front-end cart price: ${dozenDiscountedPrice}`
        );
      } else {
        console.log("Prices match!!");
      }
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalCartPrice,
              breakdown: getPurchaseUnitsAmountDetails(
                total,
                "0",
                dozenDiscount
              ),
            },
            items: paypalItems,
          },
        ],
      });

      try {
        //This is how we execute our request
        const order = await paypalClient.execute(request);
        res.json(order.result.id);
        console.log(order);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(400).json({
        message: "No cart detected, add items to your cart to make a purchase",
      });
    }
  } else {
    res.status(400);
  }
};

export default handler;
