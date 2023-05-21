"use client";
import { FunctionComponent, ReactNode, useState } from "react";
import { CartProvider } from "@_providers/cart/optimistic";
import { NotificationProvider } from "@_providers/Notification/Notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckoutInfoProvider from "./Checkout/CustomerInfo";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <CheckoutInfoProvider>
        <NotificationProvider>
          <CartProvider>{children}</CartProvider>
        </NotificationProvider>
      </CheckoutInfoProvider>
    </QueryClientProvider>
  );
};

export default Providers;
