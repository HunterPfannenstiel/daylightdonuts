import {
  Money,
  AmountBreakdown,
} from "@paypal/checkout-server-sdk/lib/payments/lib";
import { OrderItem, PaypalItem } from "@_types/payment";
import { getOrderExtraString } from ".";
import PayPal from "@paypal/checkout-server-sdk";
import { NextApiRequest } from "next";
import { createVerify } from "crypto";

export const getPurchaseUnitsAmountDetails = (
  orderAmount: string,
  taxAmount: string,
  discountAmount?: string
): AmountBreakdown => {
  return {
    tax_total: getMoneyObject(taxAmount),
    item_total: getMoneyObject(orderAmount),
    discount: getMoneyObject(discountAmount),
    insurance: getMoneyObject(),
    shipping: getMoneyObject(),
    shipping_discount: getMoneyObject(),
    handling: getMoneyObject(),
  };
};

const getMoneyObject = (value?: string): Money => {
  return {
    currency_code: "USD",
    value: value || "0",
  };
};

export const getItemsForPaypal = (
  items: OrderItem[],
  tax: number
): [PaypalItem[], string, string] => {
  let runningTotal = 0;
  const paypalItems: PaypalItem[] = [];
  items.forEach((item) => {
    runningTotal += (+item.price + +item.extra_price) * item.amount;
    const name = item.name + getOrderExtraString(item.extras);
    paypalItems.push({
      name: name,
      unit_amount: {
        currency_code: "USD",
        value: (+item.price + +item.extra_price).toFixed(2),
      },
      quantity: item.amount.toString(),
      category: "PHYSICAL_GOODS",
    });
  });
  return [paypalItems, runningTotal.toFixed(2), tax.toFixed(2)];
};

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

export const paypalClient = new PayPal.core.PayPalHttpClient(
  new PayPal.core.SandboxEnvironment(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!
  )
);

// export const getReducedPriceFromDozens = (eligibleDozens: EligibleDozen[]) => {
//   let reductionPrice = 0;
//   eligibleDozens.forEach(({ eligibledozen: dozen }) => {
//     const dozenCount = Math.floor(dozen.amount / dozen.size);
//     const regularPrice = dozen.itemPrice * dozen.size;
//     reductionPrice += (regularPrice - dozen.price) * dozenCount;
//   });
//   console.log("Reduction price", reductionPrice);
//   return reductionPrice.toFixed(2);
// };

export const verifyPaypalWebhookV2 = async (req: NextApiRequest) => {
  const transmissionId = req.headers["paypal-transmission-id"];
  const transmissionTime = req.headers["paypal-transmission-time"];
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const signature = req.headers["paypal-transmission-sig"];

  if (!transmissionId || !transmissionTime || !signature) return false;

  const payload =
    (transmissionId as string) +
    transmissionTime +
    webhookId +
    JSON.stringify(req.body);

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
};

export const verifyPayPalWebhook = async (req: NextApiRequest) => {
  const url =
    "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PAYPAL_CLIENT_SECRET}`,
    },
    body: JSON.stringify({
      transmission_id: req.headers["paypal-transmission-id"],
      transmission_time: req.headers["paypal-transmission-time"],
      cert_url: req.headers["paypal-cert-url"],
      auth_algo: req.headers["paypal-auth-algo"],
      transmission_sig: req.headers["paypal-transmission-sig"],
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: req.body,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error_description);
  }
  return data.verification_status === "SUCCESS";
};
