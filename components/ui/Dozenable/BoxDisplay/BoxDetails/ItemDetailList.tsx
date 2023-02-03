import { DozenBoxItems } from "@_types/dozenable";
import { FunctionComponent } from "react";
import ItemDetail from "./ItemDetail";
import classes from "./ItemDetailList.module.css";

interface ItemDetailListProps {
  items: DozenBoxItems;
  showDetails: boolean;
  className: string;
}

const ItemDetailList: FunctionComponent<ItemDetailListProps> = ({
  items,
  showDetails,
  className,
}) => {
  className = className + " " + (showDetails ? "" : classes.hide);
  const keys = Object.keys(items);
  if (keys.length > 0) {
    return (
      <ul className={classes.detail_list + " " + className}>
        {keys.map((key, i) => {
          const item = items[key];
          return (
            <ItemDetail
              key={Math.random() + i}
              name={item.name}
              itemId={key}
              extras={item.extras}
              amount={item.amount}
            />
          );
        })}
      </ul>
    );
  } else {
    return <></>;
  }
};

export default ItemDetailList;
