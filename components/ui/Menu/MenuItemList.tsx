import { MenuItem } from "@_types/database/menu";
import { FunctionComponent } from "react";
import ItemList from "../Reusable/Menu/ItemList";
import LoadingItem from "../Reusable/Menu/Loading/LoadingItem";
import Item from "./MenuItem";

interface MenuItemListProps {
  items: MenuItem[] | undefined;
  category: string | undefined;
}

const MenuItemList: FunctionComponent<MenuItemListProps> = ({
  items,
  category,
}) => {
  if (items) {
    let linkURLPrefix: string;
    if (category === "Dozenable") {
      linkURLPrefix = "/menu/dozenable/";
    } else {
      linkURLPrefix = "/menu/";
    }
    return (
      <ItemList>
        {items.map((item) => (
          <Item key={item.name} item={item} linkURLPrefix={linkURLPrefix} />
        ))}
      </ItemList>
    );
  } else {
    const loadItems = ["", "", "", "", ""];
    return (
      <ItemList>
        {loadItems.map((_, i) => (
          <LoadingItem key={i} />
        ))}
      </ItemList>
    );
  }
};

export default MenuItemList;
