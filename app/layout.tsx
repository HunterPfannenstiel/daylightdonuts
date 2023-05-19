import { Metadata } from "next";

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
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
