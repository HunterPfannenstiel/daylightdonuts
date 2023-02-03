import { useEffect, useState } from "react";

const useItemUpdate = (
  unitPrice: number,
  initialAmount: number,
  isPendingUpdates: boolean
) => {
  const [updatedPrice, setUpdatedPrice] = useState(unitPrice * initialAmount);
  const [updatedAmount, setUpdatedAmount] = useState(0);

  const showAmount = initialAmount + updatedAmount;
  const setNewAmount = (addAmount: number) => {
    setUpdatedAmount((prevState) => prevState + addAmount);
  };
  const setNewPrice = (addPrice: number) => {
    setUpdatedPrice((prevState) => prevState + addPrice);
  };

  useEffect(() => {
    if (!isPendingUpdates) {
      setUpdatedPrice(unitPrice * initialAmount);
      setUpdatedAmount(0);
    }
  }, [isPendingUpdates]);

  return {
    updatedPrice,
    setNewPrice,
    updatedAmount,
    showAmount,
    setNewAmount,
  };
};

export default useItemUpdate;
