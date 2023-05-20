"use client";
import { FunctionComponent, ReactNode, useState } from "react";
import { CartProvider } from "@_providers/cart/optimistic";
import { NotificationProvider } from "@_providers/Notification/Notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <NotificationProvider>
      <QueryClientProvider client={client}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
};

export default Providers;
