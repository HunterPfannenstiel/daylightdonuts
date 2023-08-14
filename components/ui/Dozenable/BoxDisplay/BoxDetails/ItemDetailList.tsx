import { BoxPayload, DozenBox, DozenBoxItems } from "@_types/dozenable";
import { Dispatch, FunctionComponent } from "react";
import ItemDetail from "./ItemDetail";
import classes from "./ItemDetailList.module.css";
import { concatClassNames } from "@_utils/client";

interface ItemDetailListProps {
  items: DozenBoxItems;
  showDetails: boolean;
  className: string;
  box: DozenBox;
  dispatchBox: Dispatch<BoxPayload>;
}

const ItemDetailList: FunctionComponent<ItemDetailListProps> = ({
  items,
  showDetails,
  className,
  box,
  dispatchBox,
}) => {
  const keys = Object.keys(items);
  if (keys.length > 0) {
    return (
      <ul
        className={concatClassNames(
          classes.detail_list,
          className,
          showDetails ? classes.hide : undefined
        )}
      >
        {keys.map((key) => {
          const item = items[key];
          return (
            <ItemDetail
              key={key}
              name={item.name}
              itemId={key}
              extras={item.extras}
              amount={item.amount}
              box={box}
              dispatchBox={dispatchBox}
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
