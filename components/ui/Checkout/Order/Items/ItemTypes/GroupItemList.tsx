import { CartDozenItem } from "@_types/database/cart";
import { CSSProperties, FunctionComponent } from "react";
import GroupItem from "./GroupItem";
import classes from "./GroupItemList.module.css";

interface GroupItemListProps {
  items: CartDozenItem[];
  groupId: string;
  boxId: string;
  boxAmount: number;
  disabledButtons: boolean;
  updateModifiedAmount: (id: string, amout: number) => void;
}

const GroupItemList: FunctionComponent<GroupItemListProps> = ({
  items,
  groupId,
  boxId,
  boxAmount,
  disabledButtons,
  updateModifiedAmount,
}) => {
  return (
    <ul className={classes.list}>
      {items.map((item, i) => {
        return (
          <li
            key={item.id}
            style={{ "--delay": `${i * 20}ms` } as CSSProperties}
            className={classes.item}
          >
            <GroupItem
              item={item.item}
              itemId={item.id}
              groupId={groupId}
              boxId={boxId}
              boxAmount={boxAmount}
              disabledButtons={disabledButtons}
              updateModifiedAmount={updateModifiedAmount}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default GroupItemList;
