import { CustomerInfo } from "@_types/payment";
import { getCartCookieId } from "@_utils/database/cart/cookies";
import { createOptimisticOrder } from "@_utils/payment/create-order/queries";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const cartId = getCartCookieId(req.cookies);
    if (cartId) {
      const customerInfo = req.body as CustomerInfo;
      const error = verifyCustomerInfo(customerInfo);
      if (error) {
        res.status(422).json({ message: error });
        return;
      }
      try {
        await createOptimisticOrder(customerInfo, "Stripe", cartId);
      } catch (e: any) {
        console.log(e);
        res
          .status(500)
          .json({ message: "Unexpected error occurred when creating order" });
        return;
      }
      res.status(200).json({ message: "Created optimistic order" });
    } else {
      res
        .status(400)
        .json({ message: "Cart was not found, cannot create order" });
      return;
    }
  } else {
    res.status(400).json({ message: "Invalid method request" });
  }
};

const verifyCustomerInfo = (info: CustomerInfo) => {
  console.log(info);
  if (!info.email || !info.email.includes("@")) {
    return "Invalid Email";
  }
  if (
    !info.firstName ||
    !info.lastName ||
    !info.location ||
    !info.phone ||
    !info.pickupDate ||
    !info.pickupTime
  ) {
    return "Missing a required field";
  }
};

export default handler;
