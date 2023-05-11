import { customerQuery } from "@_utils/database/connect";
import { v4 as uuid } from "uuid";

type CustomerInfo = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};
type CreateOrder = {
  cartId: number;
  locationId: number;
  pickupTimeId: number;
  pickupDate: string;
  processorId: number;
  customerInfo?: CustomerInfo;
  accountId?: number;
  userInfoId?: number;
};
export const createOrder = async (orderInfo: CreateOrder): Promise<number> => {
  const query = "CALL store.create_order($1, $2, $3, $4, $5, NULL, $6, $7, $8)";
  const res = await customerQuery(query, [
    orderInfo.cartId,
    orderInfo.locationId,
    orderInfo.pickupTimeId,
    orderInfo.pickupDate,
    orderInfo.processorId,
    orderInfo.customerInfo || null,
    orderInfo.accountId || null,
    orderInfo.userInfoId || null,
  ]);
  if (res.rows.length === 0)
    throw new Error("Something went wrong, create_cart did not return cartId");
  return res.rows[0].id;
};

// export const getCartIdFromPaymentId = async (paymentId: string) => {
//   const query = "SELECT cart_id FROM cart WHERE payment_id = $1";

//   const cartId = (await customerParamQuery(query, [paymentId])) as {
//     cart_id: string;
//   }[];
//   return cartId[0].cart_id;
// };

export const verifyOrder = async (
  orderId: number,
  subtotal: number,
  tax: number,
  totalPrice: number,
  paymentUID: string
) => {
  const query = "CALL store.confirm_order($1, $2, $3, $4, $5)";
  await customerQuery(query, [orderId, subtotal, tax, totalPrice, paymentUID]);
};
