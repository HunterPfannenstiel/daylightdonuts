import { Extra } from "@_types/database/cart";
import { CustomerInfo } from "@_types/database/checkout";
import { validateEmail, validatePhone } from "..";

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

export const validateCustomerInfo = (info: CustomerInfo) => {
  if (!info) throw new Error("Please provide pickup information");
  if (!info.locationId) throw new Error("Please provide a location");
  if (!info.pickupDate) throw new Error("Please provide a pickup date");
  if (!info.pickupTimeId) throw new Error("Please provide a pickup time");
  if (info.customerInfo) {
    if (!info.customerOrderInfo.first_name)
      throw new Error("Please provide a first name");
    if (!info.customerOrderInfo.last_name)
      throw new Error("Please provide a last name");
    validateEmail(info.customerOrderInfo.email);
    const { formattedPhone } = validatePhone(
      info.customerOrderInfo.phone_number
    );
    console.log("Formatted Phone: ", formattedPhone);
    info.customerOrderInfo.phone_number = formattedPhone;
  } else {
    if (!info.userInfoId)
      throw new Error(
        "Please provide information for the person who will be picking up the order"
      );
  }
};
