import useDozenUpdate from "@_hooks/cart/useDozenUpdate";
import {
  CartDozen,
  CartDozenItem,
  DozenDBItem,
  Items,
} from "@_types/database/cart";
import { getCartItemId } from "@_utils/database/cart/cart";
import { FunctionComponent, ReactNode, useEffect } from "react";
import Item from "../Item";

interface ItemGroupProps {
  box: CartDozen;
  boxId: string;
  boxSize: number;
  boxPrice: number;
  groupItems: Items;
  groupId: string;
  hideUnderline: boolean;
  getNewAmount: (extraAmount: number) => void;
  children: ReactNode;
  disableButtons: boolean;
}

const ItemGroup: FunctionComponent<ItemGroupProps> = ({
  box,
  boxId,
  boxSize,
  boxPrice,
  groupItems,
  groupId,
  hideUnderline,
  getNewAmount,
  children,
  disableButtons,
}) => {
  const { updatedPrice, showAmount, handleUpdateDozen } = useDozenUpdate(
    boxPrice,
    box.amount
  );
  const updateAmount = (newAmount: number) => {
    handleUpdateDozen(
      newAmount,
      boxPrice,
      boxSize,
      groupId,
      boxId,
      getDozenDBItems(box.items, groupItems, newAmount)
    );
  };
  useEffect(() => {
    getNewAmount(showAmount);
  }, [showAmount]);

  return (
    <Item
      name="Box"
      info={children}
      amount={showAmount}
      updateAmount={updateAmount}
      price={updatedPrice}
      hideUnderline={hideUnderline}
      disabledButtons={disableButtons}
    />
  );
};

const getDozenDBItems = (
  items: CartDozenItem[],
  groupItems: Items,
  updateAmount: number
) => {
  const updateItems: DozenDBItem[] = [];
  items.forEach((item) => {
    updateItems.push({
      cartItemId: getCartItemId(groupItems, item.id).toString(),
      modifyItems: item.item.amount * updateAmount,
      modifyPrice: item.item.unitPrice * updateAmount * item.item.amount,
    });
  });
  return updateItems;
};

export default ItemGroup;
