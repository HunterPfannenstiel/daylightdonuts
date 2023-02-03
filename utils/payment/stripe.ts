import { CustomerInfo } from "@_types/payment";

export const fetchStripeClientSecret = async () => {
  const res = await fetch("/api/cart/payment/create-payment-intent");
  const data = (await res.json()) as { client_secret: string };
  return data.client_secret;
};

export const postOptimisticOrder = async (customerInfo: CustomerInfo) => {
  const response = await fetch("/api/cart/order/create-stripe-order", {
    method: "POST",
    body: JSON.stringify({ ...customerInfo }),
    headers: { "Content-type": "application/json" },
  });
  const data = (await response.json()) as { message: string };
  if (!response.ok) {
    throw new Error(data.message);
  }
};
