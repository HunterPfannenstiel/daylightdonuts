import { NextApiHandler } from "next";
import PayPal from "@paypal/checkout-server-sdk";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import {
  getItemsForPaypal,
  getPurchaseUnitsAmountDetails,
} from "@_utils/payment/paypal";
import { getOrderItems } from "@_utils/payment/queries";
import { calculateCartTotal } from "@_utils/payment/payment";

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
      //The request is the 'thing we want to do'
      const request = new PayPal.orders.OrdersCreateRequest();
      //This makes sure the pop-up section works properly
      const orderItems = await getOrderItems(cartId);
      const [paypalItems, totalFromItems] = getItemsForPaypal(orderItems);
      const { subtotal, tax, total, groupingDiscount } =
        await calculateCartTotal(cartId);
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
              breakdown: getPurchaseUnitsAmountDetails(
                total.toFixed(2),
                tax.toFixed(2),
                groupingDiscount.toFixed(2)
              ),
            },
            items: paypalItems,
          },
        ],
      });
      console.log("ENSURE THAT DISCOUNT IS NOT REMOVED FROM TOTAL", {
        total,
        groupingDiscount,
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
