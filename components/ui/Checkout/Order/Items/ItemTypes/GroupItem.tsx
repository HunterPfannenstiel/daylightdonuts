import useDozenItemUpdate from "@_hooks/cart/useDozenItemUpdate";
import { CartItem, Extra } from "@_types/database/cart";
import { FunctionComponent } from "react";
import Item from "../Item";

interface GroupItemProps {
  item: CartItem;
  itemId: string;
  groupId: string;
  boxId: string;
  boxAmount: number;
  disabledButtons: boolean;
  updateModifiedAmount: (id: string, amount: number) => void;
}

const GroupItem: FunctionComponent<GroupItemProps> = ({
  item,
  itemId,
  groupId,
  boxId,
  boxAmount,
  disabledButtons,
  updateModifiedAmount,
}) => {
  const { updatedPrice, showAmount, handleUpdateDozenItem } =
    useDozenItemUpdate(item.unitPrice, item.amount * boxAmount);
  let extras = getExtraString(item.extras);
  const updateAmount = (newAmount: number) => {
    updateModifiedAmount(itemId, newAmount);
    handleUpdateDozenItem(
      newAmount,
      item.cartItemId.toString(),
      itemId,
      groupId,
      boxId
    );
  };

  return (
    <Item
      name={item.name}
      image={item.image}
      info={extras}
      amount={showAmount}
      updateAmount={updateAmount}
      price={updatedPrice}
      hideUnderline={true}
      disabledButtons={disabledButtons}
    />
  );
};

const getExtraString = (extras: Extra[] | [null]) => {
  let extraString = "";
  extras.forEach((extra) => {
    if (extra?.category && extra.extra && extra.extra !== "None") {
      extraString += `${extra.category}: ${extra.extra}\n`;
    }
  });

  return extraString;
};

export default GroupItem;
