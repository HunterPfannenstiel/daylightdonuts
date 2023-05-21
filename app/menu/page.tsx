import { Metadata } from "next";
import MenuPage from "components/ui/Menu/MenuPage";
import { MenuItem } from "@_types/database/menu";

export const metadata: Metadata = {
  title: "Delicious Donuts - Menu | Daylight Donuts",
  description:
    "Choose through a wide variety of donuts and savory goods that are made fresh everyday",
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const Menu = async ({ searchParams }: { searchParams: SearchParams }) => {
  let category = searchParams["category"];
  let filter = searchParams["filter"];
  if (typeof category === typeof "object") {
    category = undefined;
  }
  if (typeof filter === typeof "object") {
    filter = undefined;
  }
  const items = await getMenuItems(category, filter);
  return <MenuPage items={items} category={category as string | undefined} />;
};

const getMenuItems = async (category: any, filter: any) => {
  console.log("fetching");
  let response: Response;
  if (category === "Dozenable") {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/menu/dozenable`,
      { cache: "no-store" }
    );
  } else {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/menu/filter?category=${category}&filter=${filter}`,
      { cache: "no-store" }
    );
  }
  const data = await response.json();
  return data as MenuItem[];
};

export default Menu;
