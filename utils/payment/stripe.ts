import { CustomerInfo } from "@_types/database/checkout";
import APIRequest from "custom-objects/Fetch";

export const fetchStripeClientSecret = async () => {
  const res = await fetch("/api/cart/payment/create-payment-intent");
  const data = (await res.json()) as { client_secret: string };
  return data.client_secret;
};

export const postOptimisticOrder = async (customerInfo: CustomerInfo) => {
  const { data, success, errorMessage } = await APIRequest.request(
    "/api/cart/order/create-order",
    {
      method: "POST",
      body: JSON.stringify(customerInfo),
      headers: { "Content-type": "application/json" },
    }
  );
  if (!success) {
    throw new Error(errorMessage);
  }
};
