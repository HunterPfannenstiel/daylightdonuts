import { useCartUpdates } from "@_providers/old-cart/CartUpdates/CartUpdates";
import useItemUpdate from "./useItemUpdate";

const useExistingItemUpdate = (unitPrice: number, initialAmount: number) => {
  const { handleItemUpdate, isPendingUpdates } = useCartUpdates();
  const { showAmount, updatedAmount, setNewAmount, updatedPrice, setNewPrice } =
    useItemUpdate(unitPrice, initialAmount, isPendingUpdates);

  const handleUpdateItem = (
    addAmount: number,
    cartItemId: string,
    itemId: string,
    groupId: string
  ) => {
    if (-updatedAmount + -addAmount <= initialAmount) {
      // let newAmount = 0;
      // setUpdatedAmount((prevState) => {
      //   newAmount = prevState + addAmount;
      //   return newAmount;
      // });
      const modifyPrice = addAmount * unitPrice;
      // setUpdatedPrice(() => (initialAmount + newAmount) * unitPrice);
      setNewAmount(addAmount);
      setNewPrice(modifyPrice);
      handleItemUpdate(modifyPrice, addAmount, cartItemId, groupId, {
        amount: addAmount,
        itemId,
      });
    }
  };

  return {
    showAmount,
    updatedPrice,
    handleUpdateItem,
  };
};

export default useExistingItemUpdate;
