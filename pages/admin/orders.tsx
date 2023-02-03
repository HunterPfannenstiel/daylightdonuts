import OrderDisplay from "components/admin/ui/Orders/OrderDisplay";
import { NextPage } from "next";
import classes from "./Orders.module.css";

interface OrdersProps {}

const Orders: NextPage<OrdersProps> = () => {
  return <OrderDisplay />;
};

export default Orders;
