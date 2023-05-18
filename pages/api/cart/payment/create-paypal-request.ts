import { NextApiHandler } from "next";
import PayPal from "@paypal/checkout-server-sdk";
import { paypalClient } from "@_utils/payment/paypal";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import {
  getItemsForPaypal,
  getPurchaseUnitsAmountDetails,
} from "@_utils/payment/paypal";
import { getOrderItems } from "@_utils/payment/queries";
import { calculateCartTotal } from "@_utils/payment/payment";
import { OrderMetadata } from "@_types/payment";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const cartId = getCartCookieId(req.cookies);
      if (cartId) {
        //The request is the 'thing we want to do'
        const request = new PayPal.orders.OrdersCreateRequest();
        //This makes sure the pop-up section works properly
        const { subtotal, tax, total, groupingDiscount } =
          await calculateCartTotal(cartId);
        const orderItems = await getOrderItems(cartId);
        const [paypalItems, totalFromItems, taxAmount] = getItemsForPaypal(
          orderItems,
          tax
        );
        request.prefer("return=representation");
        request.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: (
                  +totalFromItems +
                  +taxAmount -
                  groupingDiscount
                ).toFixed(2),
                breakdown: getPurchaseUnitsAmountDetails(
                  totalFromItems,
                  taxAmount,
                  groupingDiscount.toFixed(2)
                ),
              },
              items: paypalItems,
              custom_id: JSON.stringify({
                cartId: cartId.toString(),
                subtotal: subtotal.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2),
              } as OrderMetadata),
            },
          ],
        });

        //This is how we execute our request
        const order = await paypalClient.execute(request);
        console.log(order);
        return res.status(200).json(order.result.id);
      } else {
        res.status(400).json({
          message:
            "No cart detected, add items to your cart to make a purchase",
        });
      }
    } else {
      res.status(400);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
