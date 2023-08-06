"use client";

import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import OrderDetails from "./Components/OrderDetails";
import OrderItems from "./Components/OrderItems";
import CustomerInfo from "./Components/CustomerInfo";
import Payment from "./Components/Payment";
import useCustomerInput from "@_hooks/checkout/useCustomerInput";
import Button from "components/ui/Reusable/Button";
import Totals from "./Components/Totals";
import { useCart } from "@_providers/Cart";
import Spinner from "components/ui/Reusable/Spinner";

interface CheckoutPageProps {}

const CheckoutPage: FunctionComponent<CheckoutPageProps> = () => {
  const input = useCustomerInput();
  const cartContext = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paypalSelected, setPaypalSelected] = useState(true);
  const validateInfo = () => {
    return input.validateCustomerInfo();
  };

  if (cartContext.isLoading || input.isLoading) return <Spinner center />;

  return (
    <div className={classes.page}>
      <OrderItems cartContext={cartContext} />
      <OrderDetails
        updateLocationDetails={input.updateFormInfo}
        values={input.getLocationInfo()}
      />
      <CustomerInfo
        setInfoId={input.setInfoId}
        updateInfo={input.updateFormInfo}
        {...input.getCustomerInfo()}
      />
      <Payment
        setLoading={setIsLoading}
        checkCustomerForm={validateInfo}
        setIsPayPalSelected={setPaypalSelected}
        postOrder={input.postOrder}
      />
      <Totals subtotal={cartContext.cart?.price || "0.00"} tax="0.00" />
      <div className={classes.buttons}>
        <Button>I'm Still Hungry</Button>
        {!paypalSelected && <Button form="payment-form">Place Order</Button>}
      </div>
    </div>
  );
};

export default CheckoutPage;
