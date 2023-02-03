import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { CartProvider } from "@_providers/cart/optimistic";
import Header from "components/ui/Header/Header";
import { useState } from "react";
import { NotificationProvider } from "@_providers/Notification/Notification";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    })
  );

  return (
    <NotificationProvider>
      <QueryClientProvider client={client}>
        <CartProvider>
          <Head>
            <title>Daylight Donuts - Order Today</title>
            <meta
              name="description"
              content="Search through our wide variety donuts that are made fresh everyday! Place your order today, no sign-in required!"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta charSet="UTF-8" />
            <link rel="shortcut icon" type="image/x-icon" href="donutfav.png" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
}

export default MyApp;
