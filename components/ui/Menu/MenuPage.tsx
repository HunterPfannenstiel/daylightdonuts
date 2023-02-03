import useMenu from "@_hooks/menu/useMenu";
import { FunctionComponent } from "react";
import MenuItemList from "./MenuItemList";

interface MenuPageProps {}

const MenuPage: FunctionComponent<MenuPageProps> = () => {
  const [menuItems, isLoading, query] = useMenu();
  return <MenuItemList items={menuItems} category={query.category} />;
};

export default MenuPage;
