import { CustomerInfo } from "@_types/payment";
import { customerParamQuery } from "@_utils/database/connect";
import { v4 as uuid } from "uuid";

export const createOptimisticOrder = async (
  customerInfo: CustomerInfo,
  processor: "PayPal" | "Stripe",
  cartId: string
) => {
  const orderIdQuery = `SELECT order_id FROM public.${"order"} WHERE cart_id = $1;`;
  const orderId = (await customerParamQuery(orderIdQuery, [cartId]))[0] as {
    order_id: string;
  };
  if (!orderId) {
    console.log("Adding new order");
    const query = `INSERT INTO public.${"order"} (order_id, cart_id, first_name, last_name, email, location, pickup_date, pickup_time, payment_processor, printed, verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'false', 'false');`;

    await customerParamQuery(query, [
      uuid(),
      cartId,
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.email,
      customerInfo.location,
      customerInfo.pickupDate,
      customerInfo.pickupTime,
      processor,
    ]);
  } else {
    console.log("Updating Info");
    const query = `UPDATE public.${"order"} SET (first_name, last_name, email, location, pickup_date, pickup_time, payment_processor) = ($1, $2, $3, $4, $5, $6, $7) WHERE order_id = $8;`;
    await customerParamQuery(query, [
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.email,
      customerInfo.location,
      customerInfo.pickupDate,
      customerInfo.pickupTime,
      processor,
      orderId.order_id,
    ]);
  }
};

export const getCartIdFromPaymentId = async (paymentId: string) => {
  const query = "SELECT cart_id FROM cart WHERE payment_id = $1";

  const cartId = (await customerParamQuery(query, [paymentId])) as {
    cart_id: string;
  }[];
  return cartId[0].cart_id;
};

export const verifyOrder = async (cartId: string, totalPrice: number) => {
  const query = `UPDATE public.${"order"} SET verified = true, total_price = $1, error = false WHERE cart_id = $2;`;

  await customerParamQuery(query, [totalPrice.toString(), cartId]);
};
