"use client";

import useMenu from "@_hooks/menu/useMenu";
import { FunctionComponent } from "react";
import MenuItemList from "./MenuItemList";
import { MenuItem } from "@_types/database/menu";

interface MenuPageProps {
  items: MenuItem[];
  category: string | undefined;
}

const MenuPage: FunctionComponent<MenuPageProps> = ({ items, category }) => {
  // const [menuItems, isLoading, query] = useMenu();
  return <MenuItemList items={items} category={category} />;
};

export default MenuPage;
