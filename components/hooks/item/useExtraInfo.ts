import { CartExtraInfo, ExtraInfo } from "@_types/database/cart";
import { useState } from "react";

const useExtraInfo = () => {
  const [extraInfo, setExtraInfo] = useState<CartExtraInfo>({});

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
