import { LocationDetails } from "@_types/database/checkout";
import { customerQuery } from "./connect";

export const getPickupInfo = async () => {
  const query = "SELECT * FROM store.get_checkout_info()";
  const res = await customerQuery(query);
  return res.rows as LocationDetails[];
};
