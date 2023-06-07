import { getDayRange } from "@_utils/orders/dates";
import { adminQuery } from "../connect";
import { DBOrder, DateRange } from "@_types/admin/orders";

export const fetchOrdersWithinRange = async (
  from?: string,
  to?: string,
  page = 1
) => {
  let range: DateRange;
  if (!from || !to) {
    range = getDayRange();
  } else {
    range = { startDate: from, endDate: to };
  }
  const query = "SELECT * FROM store.fetch_orders($1, $2)";
  const res = await adminQuery(query, [range.startDate, range.endDate]);
  return res.rows as DBOrder[];
};
