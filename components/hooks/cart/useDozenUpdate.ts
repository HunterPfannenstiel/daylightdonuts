import { useCartUpdates } from "@_providers/cart/CartUpdates/CartUpdates";
import { DozenDBItem } from "@_types/database/cart";
import useItemUpdate from "./useItemUpdate";

const useDozenUpdate = (unitPrice: number, initialAmount: number) => {
  const { handleDozenUpdate, isPendingUpdates } = useCartUpdates();
  const { showAmount, updatedAmount, setNewAmount, updatedPrice, setNewPrice } =
    useItemUpdate(unitPrice, initialAmount, isPendingUpdates);

  const handleUpdateDozen = (
    dozensAdded: number,
    groupPrice: number,
    groupSize: number,
    groupId: string,
    dozenId: string,
    items: DozenDBItem[]
  ) => {
    if (-updatedAmount + -dozensAdded <= initialAmount) {
      const modifyPrice = dozensAdded * groupPrice;
      setNewAmount(dozensAdded);
      setNewPrice(modifyPrice);
      handleDozenUpdate(
        modifyPrice,
        groupSize * dozensAdded,
        groupId,
        { dozenId, amount: dozensAdded },
        items
      );
    }
  };

  return {
    showAmount,
    updatedPrice,
    handleUpdateDozen,
  };
};

export default useDozenUpdate;
