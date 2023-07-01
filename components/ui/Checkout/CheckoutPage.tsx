"use client";

import usePage from "@_hooks/checkout/usePage";
import useSuccess from "@_hooks/checkout/useSuccess";
import { CartUpdatesProvider } from "@_providers/cart/CartUpdates/CartUpdates";
import { useCart } from "@_providers/cart/optimistic";
import { FunctionComponent } from "react";
import CheckoutForm from "./Form/CheckoutForm";
import OrderPage from "./Order/OrderPage";
import New from "./New";

interface CheckoutPageProps {}

const CheckoutPage: FunctionComponent<CheckoutPageProps> = () => {
  // useSuccess();
  // const { cart } = useCart();
  // const { renderOrder, playAnimation } = usePage(300);

  // if (cart) {
  //   if (renderOrder) {
  //     return (
  //       <CartUpdatesProvider>
  //         <OrderPage
  //           groups={cart?.groups}
  //           subtotal={+cart.totalPrice.toFixed(2)}
  //           totalItems={cart.totalItems}
  //           playAnimation={playAnimation}
  //         />
  //       </CartUpdatesProvider>
  //     );
  //   } else {
  //     return (
  //       <CheckoutForm
  //         subtotal={+cart.totalPrice.toFixed(2)}
  //         playAnimation={playAnimation}
  //       />
  //     );
  //   }
  // } else {
  //   return <></>;
  // }
  return <New />;
};

export default CheckoutPage;
