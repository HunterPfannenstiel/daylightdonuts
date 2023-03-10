import {
  Money,
  AmountBreakdown,
} from "@paypal/checkout-server-sdk/lib/payments/lib";
import { moneyToNum } from "@_providers/cart/utils";
import { EligibleDozen, OrderItem, PaypalItem } from "@_types/payment";
import { getOrderExtraString } from ".";

export const getPurchaseUnitsAmountDetails = (
  orderAmount: string,
  taxAmount: string,
  discountAmount?: string
): AmountBreakdown => {
  return {
    tax_total: getMoneyObject(taxAmount),
    item_total: getMoneyObject(orderAmount),
    discount: getMoneyObject(discountAmount),
    insurance: getMoneyObject("0"),
    shipping: getMoneyObject("0"),
    shipping_discount: getMoneyObject("0"),
    handling: getMoneyObject("0"),
  };
};

const getMoneyObject = (value?: string): Money => {
  return {
    currency_code: "USD",
    value: value || "0",
  };
};

export const getItemsForPaypal = (
  items: OrderItem[]
): [PaypalItem[], string] => {
  let runningTotal = 0;
  const paypalItems: PaypalItem[] = [];
  items.forEach((item) => {
    let extraPrice = 0;
    item.extra_prices.forEach((price) => {
      extraPrice += price;
    });
    let total = moneyToNum(item.unitprice) + extraPrice;
    runningTotal += total * item.amount;
    const name = item.name + getOrderExtraString(item.extras);
    paypalItems.push({
      name: name,
      unit_amount: {
        currency_code: "USD",
        value: total.toFixed(2),
      },
      quantity: item.amount.toString(),
      category: "PHYSICAL_GOODS",
    });
  });
  return [paypalItems, runningTotal.toFixed(2)];
};

export const getReducedPriceFromDozens = (eligibleDozens: EligibleDozen[]) => {
  let reductionPrice = 0;
  eligibleDozens.forEach(({ eligibledozen: dozen }) => {
    const dozenCount = Math.floor(dozen.amount / dozen.size);
    const regularPrice = dozen.itemPrice * dozen.size;
    reductionPrice += (regularPrice - dozen.price) * dozenCount;
  });
  console.log("Reduction price", reductionPrice);
  return reductionPrice.toFixed(2);
};
