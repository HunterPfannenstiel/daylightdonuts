import { Item } from "@_types/database/menu";
import ItemList from "components/ui/Reusable/Menu/ItemList";
import { FunctionComponent } from "react";
import DozenableItem from "./DozenableItem";
import classes from "./DozenableItemList.module.css";

interface DozenableItemListProps {
  items: Item[];
}

const DozenableItemList: FunctionComponent<DozenableItemListProps> = ({
  items,
}) => {
  return (
    <ItemList className={classes.item_list}>
      {items.map((item) => {
        return <DozenableItem key={item.name} item={item} />;
      })}
    </ItemList>
  );
};

export default DozenableItemList;
