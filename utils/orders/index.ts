import { OrderItemContent } from "@_types/admin/orders";
import { getOrderExtraString } from "@_utils/payment";

export const getOrderContentString = (contents: OrderItemContent[]) => {
  let contentString = "";
  contents.forEach((item) => {
    contentString += `${item.amount} ${item.name}${getOrderExtraString(
      item.extras
    )}\n`;
  });
  return contentString;
};
