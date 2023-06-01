import { FunctionComponent } from "react";
import { Metadata } from "next";
import MenuPage from "components/ui/Menu/MenuPage";

export const metadata: Metadata = {
  title: "Delicious Donuts - Menu | Daylight Donuts",
  description:
    "Choose through a wide variety of donuts and savory goods that are made fresh everyday",
};

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
  return <MenuPage />;
};

export default Menu;
