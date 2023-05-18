import {
  Money,
  AmountBreakdown,
} from "@paypal/checkout-server-sdk/lib/payments/lib";
import { OrderItem, PaypalItem } from "@_types/payment";
import { getOrderExtraString } from ".";
import PayPal from "@paypal/checkout-server-sdk";

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
