import useExistingItemUpdate from "@_hooks/cart/useExistingItemUpdate";
import { CartItem, Extra } from "@_types/database/cart";
import { getExtraString } from "@_utils/database/cart/cart";
import { FunctionComponent } from "react";
import Item from "../Item";

interface ExistingItemProps {
  item: CartItem;
  itemId: string;
  groupId: string;
}

const ExistingItem: FunctionComponent<ExistingItemProps> = ({
  item,
  itemId,
  groupId,
}) => {
  const { updatedPrice, showAmount, handleUpdateItem } = useExistingItemUpdate(
    item.unitPrice,
    item.amount
  );
  let extras = getExtraString(item.extras);
  const updateAmount = (newAmount: number) => {
    handleUpdateItem(newAmount, item.cartItemId.toString(), itemId, groupId);
  };

  return (
    <Item
      name={item.name}
      image={item.image}
      info={extras}
      amount={showAmount}
      updateAmount={updateAmount}
      price={updatedPrice}
    />
  );
};

export default ExistingItem;
