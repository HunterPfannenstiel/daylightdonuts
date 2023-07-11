"use client";

import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import OrderDetails from "./Components/OrderDetails";
import OrderItems from "./Components/OrderItems";
import CustomerInfo from "./Components/CustomerInfo";
import Payment from "./Components/Payment";
import useCustomerInput from "@_hooks/checkout/useCustomerInput";

interface CheckoutPageProps {}

const CheckoutPage: FunctionComponent<CheckoutPageProps> = () => {
  const input = useCustomerInput();

  const [isLoading, setIsLoading] = useState(false);
  const [paypalSelected, setPaypalSelected] = useState(true);
  const validateInfo = () => {
    return true;
  };
  return (
    <div className={classes.page}>
      <OrderDetails
        updateLocationDetails={input.updateLocationInfo}
        values={input.locationDetails}
      />
      <OrderItems />
      <CustomerInfo
        updateInfo={input.updateCustomerInfo}
        {...input.customerInfo}
      />
      <Payment
        setLoading={setIsLoading}
        checkCustomerForm={validateInfo}
        setIsPayPalSelected={setPaypalSelected}
        postOrder={input.postOrder}
      />
      <div>
        <button>I'm Still Hungry</button>
        <button onClick={input.postOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
