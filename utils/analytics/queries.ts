import {
  Analytics,
  DBDonutAnalytics,
  AxisInterval,
  SumParameter,
} from "@_types/admin/analytics";
import { DateRange } from "@_types/admin/orders";
import pgEscape from "pg-escape";
import { getRangeStatement } from "@_utils/orders/queries";
import { customerQuery } from "@_utils/database/connect";

export const getDonutAnalytics = async (
  interval: AxisInterval,
  dateRange: DateRange,
  menuId: string | undefined,
  sumBy: SumParameter
): Promise<Analytics> => {
  const query = `SELECT TO_CHAR(pickup_date, 'FM${pgEscape(
    interval
  )}') AS interval, EXTRACT(DOW FROM pickup_date), SUM(${getSumParameter(
    sumBy
  )}) FROM public."order"
  JOIN cart USING(cart_id)
  JOIN cart_item USING(cart_id)
  ${getRangeStatement(dateRange)}
  ${getMenuIdStatement(menuId)}
  GROUP BY 1, 2
  ORDER BY 2`;

  const labels: string[] = [];
  const data: number[] = [];
  const info = (await customerQuery(query)) as DBDonutAnalytics[];
  info.forEach((sum) => {
    labels.push(sum.interval);
    data.push(sum.sum);
  });

  return { labels, data };
};

const getMenuIdStatement = (menuId: string | undefined) => {
  //   let statement = "";
  //   menuIds.forEach((id) => {
  //     statement += `AND menu_item_id = ${pgEscape(id)} `;
  //   });
  if (menuId) {
    console.log("SHOULD NOT RETURN");
    return `AND menu_item_id = ${pgEscape(menuId)} `;
  } else {
    return "";
  }
};

const getSumParameter = (sumBy: SumParameter) => {
  switch (sumBy) {
    case "Amount":
      return "cart_item.amount";
    case "Price":
      return "cart_item.subtotal::numeric";
    default:
      throw new Error("Invalid sum parameter");
  }
};
