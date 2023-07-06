import { useCart } from "@_providers/Cart";
import { extraToString } from "@_providers/Cart/hooks/utils";
import { useNotification } from "@_providers/Notification/Notification";
import { NewCartItemExtra } from "@_types/cart";
import { ExtraInfo } from "@_types/database/cart";
import { Item } from "@_types/database/menu";
import { useRef, useState } from "react";

const useMenuItem = (item: Item) => {
  const { addItemFromItemPage } = useCart().cartModifiers;
  const [extraPrice, setExtraPrice] = useState(0);
  const selectedExtras = useRef<{ [category: string]: ExtraInfo }>({});

  const updateExtras = (category: string, extraInfo: ExtraInfo) => {
    const oldExtraPrice = selectedExtras.current[category]?.price || 0;
    const newExtraPrice = extraInfo.price || 0;
    const newPrice = newExtraPrice - oldExtraPrice;
    selectedExtras.current[category] = extraInfo;
    setExtraPrice((prevPrice) => prevPrice + newPrice);
  };
  const addItemToCart = (amount: number) => {
    addItemFromItemPage(
      { id: item.id, extras: toCartItemExtra(selectedExtras.current), amount },
      {
        name: item.name,
        price: item.price,
        imageUrl: item.image_urls[0],
        availableDays: item.available_days,
        availableRange: item.available_range,
      }
    );
  };

  return {
    extraPrice,
    showPrice: +item.price + extraPrice,
    updateExtras,
    addItemToCart,
  };
};

export default useMenuItem;

const toCartItemExtra = (extras: {
  [category: string]: ExtraInfo;
}): NewCartItemExtra[] => {
  const cartExtras: NewCartItemExtra[] = [];
  Object.keys(extras).forEach((category) => {
    const { extra, price, id } = extras[category];
    const extraString = extraToString(category, extra);
    if (extraString) {
      cartExtras.push({ text: extraString, price, id });
    }
  });
  return cartExtras;
};
