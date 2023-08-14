import Providers from "@_providers/Providers";
import Header from "components/ui/Header/Header";
// import "../public/css/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "donutfav.png",
  },
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  await auth();
  return <>{children}</>;
}

const auth = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/authenticate`
  );
  if (!res.ok) {
    console.log("redirect");
  }
};
