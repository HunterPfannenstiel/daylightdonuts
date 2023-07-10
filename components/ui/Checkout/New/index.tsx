"use client";

import { Fragment, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import OrderDetails from "./Components/OrderDetails";
import OrderItems from "./Components/OrderItems";
import CustomerInfo from "./Components/CustomerInfo";
import { useCheckoutInfo } from "@_providers/Checkout/CheckoutInfo";

interface CheckoutPageProps {}

const CheckoutPage: FunctionComponent<CheckoutPageProps> = () => {
  const { currentStoreTimes, updateCustomerInfo, customerFormInfo } =
    useCheckoutInfo();
  return (
    <div className={classes.page}>
      <OrderDetails locations={locations} times={times} />
      <OrderItems />
      <CustomerInfo updateInfo={updateCustomerInfo} {...customerFormInfo} />
      <div>
        <button>I'm Still Hungry</button>
        <button>Place Order</button>
      </div>
    </div>
  );
};

const locations = [
  { id: 1, name: "30th Street Daylight Donuts" },
  { id: 2, name: "Main Street Daylight Donuts" },
];

const times = [
  { id: 1, name: "8:00" },
  { id: 2, name: "8:30" },
  { id: 3, name: "9:00" },
  { id: 4, name: "10:00" },
];

export default CheckoutPage;
