import { CartExtraInfo, ExtraInfo } from "@_types/database/cart";
import { useState } from "react";

const useExtraInfo = () => {
  const [extraInfo, setExtraInfo] = useState<CartExtraInfo>({});

  /**
   *
   * @param category The extra category that is being changed (frosting, topping, etc...)
   * @param extraInfo The info that the category is being updated to (name, id, and extra price)
   */
  const updateExtras = (category: string, extraInfo: ExtraInfo) => {
    setExtraInfo((prevState) => {
      return { ...prevState, [category]: extraInfo };
    });
  };
  return {
    extraInfo,
    updateExtras,
  };
};

export default useExtraInfo;
