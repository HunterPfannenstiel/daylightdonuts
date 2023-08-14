import Providers from "@_providers/Providers";
import Header from "components/ui/Header/Header";
import "../public/css/global.css";
import { Metadata } from "next";
import RoosterLayout from "@ui/Reusable/RoosterLayout";

export const metadata: Metadata = {
  title: "Daylight Donuts - Order Today!",
  description:
    "Search through our wide variety donuts that are made fresh everyday! Place your order today, no sign-in required!",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "donutfav.png",
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <RoosterLayout />
          <div id="modal"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
