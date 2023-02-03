import { useCartUpdates } from "@_providers/cart/CartUpdates/CartUpdates";
import { useEffect } from "react";
import useItemUpdate from "./useItemUpdate";

const useDozenItemUpdate = (unitPrice: number, initialAmount: number) => {
  const { handleDozenItemUpdate, isPendingUpdates } = useCartUpdates();
  const { showAmount, updatedAmount, setNewAmount, updatedPrice, setNewPrice } =
    useItemUpdate(unitPrice, initialAmount, isPendingUpdates);

  const handleUpdateDozenItem = (
    addAmount: number,
    cartItemId: string,
    itemId: string,
    groupId: string,
    boxId: string
  ) => {
    if (-updatedAmount + -addAmount <= initialAmount) {
      const modifyPrice = addAmount * unitPrice;
      setNewAmount(addAmount);
      setNewPrice(modifyPrice);
      handleDozenItemUpdate(
        modifyPrice,
        addAmount,
        groupId,
        boxId,
        cartItemId,
        { itemId, amount: addAmount }
      );
    }
  };

  return {
    showAmount,
    updatedPrice,
    handleUpdateDozenItem,
  };
};

export default useDozenItemUpdate;
