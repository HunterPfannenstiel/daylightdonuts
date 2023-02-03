import { CartGroups } from "@_types/database/cart";
import { FunctionComponent } from "react";
import Group from "./Group/Group";
import ExistingItemList from "./ItemTypes/ExistingItemList";

interface ItemsProps {
  groups: CartGroups;
}

const Items: FunctionComponent<ItemsProps> = ({ groups }) => {
  const items: JSX.Element[] = [];
  const boxes: JSX.Element[] = [];
  const groupIds = Object.keys(groups);
  groupIds.forEach((key) => {
    const group = groups[key];
    items.push(
      <ExistingItemList key={key} items={group.items} groupId={key} />
    );
    if (group.totalDozens > 0) {
      boxes.push(<Group key={key} groupName={key} cartGroup={group} />);
    }
  });

  return (
    <>
      {items.map((item) => item)}
      {boxes.map((group) => group)}
    </>
  );
};

export default Items;
