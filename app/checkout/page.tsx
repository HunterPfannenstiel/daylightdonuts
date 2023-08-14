import { FunctionComponent } from "react";
import { Metadata } from "next";
import classes from "./Checkout.module.css";
import CheckoutPage from "components/ui/Checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Place Your Order - Quick Checkout",
  description:
    "Securely place your donut order and enjoy the benefits of skipping the line when you come to pick up your treats.",
};

interface CheckoutPageProps {}

const Checkout: FunctionComponent<CheckoutPageProps> = () => {
  return <CheckoutPage />;
};

export default Checkout;
