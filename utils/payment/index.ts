import { Extra } from "@_types/database/cart";

export const getNotificationMessage = (paymentIntent: any) => {
  switch (paymentIntent.status) {
    case "succeeded":
      return "Payment Succeeded!";
    case "processing":
      return "Payment is Processing";
    case "requires_payment_method":
      return "Payment was not successful, please try again";
    default:
      return "Something went wrong";
  }
};

export const getOrderExtraString = (extras: Extra[]) => {
  let extraString = "";
  if (Object.keys(extras[0]).length > 0) {
    let addedWith = false;
    const filter = extras.filter((extra) => !(extra.extra === "None"));
    const lastIndex = filter.length - 1;
    filter.forEach((extra, i) => {
      if (!addedWith) {
        extraString += " with ";
        addedWith = true;
      }
      if (i === lastIndex) {
        if (lastIndex > 1) {
          extraString += ", and ";
        } else if (i !== 0) {
          extraString += " and ";
        }
      } else if (lastIndex !== 0 && i !== 0) {
        extraString += ", ";
      }
      extraString += extra!.extra;
    });
  }

  return extraString;
};
