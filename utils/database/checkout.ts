import { LocationDetails } from "@_types/database/checkout";
import { customerQuery } from "./connect";

export const getPickupInfo = async () => {
  const query = "SELECT * FROM store.get_checkout_info()";
  const res = await customerQuery(query);
  return res.rows as LocationDetails[];
};

export const setOrderError = async (cartId: number, message: string) => {
  const query = "CALL store.set_order_error($1, $2)";
  await customerQuery(query, [cartId, message]);
};
