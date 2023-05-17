import { CreateOrder } from "@_types/database/checkout";
import { customerQuery } from "@_utils/database/connect";

export const createOrder = async (orderInfo: CreateOrder): Promise<number> => {
  const query = "CALL store.create_order($1, $2, $3, $4, NULL, $6, $7, $8)";
  const res = await customerQuery(query, [
    orderInfo.cartId,
    orderInfo.locationId,
    orderInfo.pickupTimeId,
    orderInfo.pickupDate,
    orderInfo.customerInfo,
    orderInfo.accountId,
    orderInfo.userInfoId,
  ]);
  if (res.rows.length === 0)
    throw new Error("Something went wrong, create_cart did not return cartId");
  return res.rows[0].id;
};

export const verifyOrder = async (
  orderId: number,
  subtotal: number,
  tax: number,
  totalPrice: number,
  paymentProcessorId: number,
  paymentUID: string
) => {
  const query = "CALL store.confirm_order($1, $2, $3, $4, $5, $6)";
  await customerQuery(query, [
    orderId,
    subtotal,
    tax,
    totalPrice,
    paymentProcessorId,
    paymentUID,
  ]);
};
