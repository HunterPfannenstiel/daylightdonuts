import { Customizations } from "@_types/admin/forms";
import { customerQuery } from "../connect";

export const fetchItemCustomizations = async () => {
  const query = "SELECT * FROM store.fetch_item_customizations()";
  const res = await customerQuery(query);
  return res.rows[0] as Customizations;
};
