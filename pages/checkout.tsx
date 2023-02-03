import CheckoutPage from "components/ui/Checkout/CheckoutPage";
import Head from "next/head";
import { FunctionComponent } from "react";

const Checkout: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Place Your Order - Quick Checkout</title>
        <meta
          name="description"
          content="Securely place your donut order and enjoy the benefits of skipping the line when you come to pick up your treats."
        />
      </Head>
      <CheckoutPage />
    </>
  );
};
export default Checkout;
