import { CreateOrder } from "@_types/database/checkout";
import { customerQuery } from "@_utils/database/connect";

export const createOrder = async (
  orderInfo: CreateOrder,
  accountId: number | null
): Promise<number> => {
  const customerInfo = orderInfo.customerInfo
    ? JSON.stringify([orderInfo.customerOrderInfo])
    : null;
  const query =
    "CALL store.create_order($1::INTEGER, $2::SMALLINT, $3::SMALLINT, $4::DATE, NULL, $5::JSON, $6::INTEGER, $7::INTEGER)";
  const res = await customerQuery(query, [
    orderInfo.cartId,
    orderInfo.locationId,
    orderInfo.pickupTimeId,
    orderInfo.pickupDate,
    customerInfo,
    accountId,
    orderInfo.userInfoId,
  ]);
  if (res.rows.length === 0)
    throw new Error("Something went wrong, create_cart did not return cartId");
  return res.rows[0].id;
};

export const verifyOrder = async (
  cartId: number,
  subtotal: number,
  tax: number,
  totalPrice: number,
  paymentProcessorId: number,
  paymentUID: string
) => {
  const query = "CALL store.confirm_order($1, $2, $3, $4, $5, $6)";
  await customerQuery(query, [
    cartId,
    subtotal,
    tax,
    totalPrice,
    paymentProcessorId,
    paymentUID,
  ]);
};
