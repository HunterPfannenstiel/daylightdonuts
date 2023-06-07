import { DBOrder } from "@_types/admin/orders";

const OrderPage = async () => {
  const orders = await getTodaysOrders();
  return (
    <>
      {orders.map((order) => {
        return <h2>{order.customer_info.name}</h2>;
      })}
    </>
  );
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
