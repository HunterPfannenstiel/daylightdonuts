import { Items } from "@_types/database/cart";
import { FunctionComponent } from "react";
import ExistingItem from "./ExistingItem";

interface ExistingItemListProps {
  items: Items;
  groupId: string;
}

const ExistingItemList: FunctionComponent<ExistingItemListProps> = ({
  items,
  groupId,
}) => {
  const itemIds = Object.keys(items);
  return (
    <ul>
      {itemIds.map((key) => {
        if (items[key].amount > 0) {
          return (
            <li key={key}>
              <ExistingItem item={items[key]} itemId={key} groupId={groupId} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ExistingItemList;
