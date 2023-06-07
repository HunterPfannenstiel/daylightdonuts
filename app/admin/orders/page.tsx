import { DBOrder } from "@_types/admin/orders";
import OrderItemList from "components/admin/ui/Orders/OrderItem/OrderItemList";

const OrderPage = async () => {
  const orders = await getTodaysOrders();
  return <OrderItemList orders={orders} />;
};

export default OrderPage;

const getTodaysOrders = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/order/range`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as DBOrder[];
};
