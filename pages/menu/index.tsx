import MenuPage from "components/ui/Menu/MenuPage";
import Head from "next/head";
import { FunctionComponent } from "react";

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
  return (
    <>
      <Head>
        <title>Delicious Donuts - Menu | Daylight Donuts</title>
        <meta
          name="description"
          content="Choose through a wide variety of donuts and savory goods that are made fresh everyday"
        />
      </Head>
      <MenuPage />
    </>
  );
};

export default Menu;
