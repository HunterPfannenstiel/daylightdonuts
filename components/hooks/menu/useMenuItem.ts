import { checkItemExists } from "@_providers/Cart/utils";
import { useNotification } from "@_providers/Notification/Notification";
import { Cart, CartItemExtra } from "@_types/cart";
import { ExtraInfo } from "@_types/database/cart";
import { Item } from "@_types/database/menu";
import { useRef, useState } from "react";

const useMenuItem = (item: Item) => {
  // const { updateCart, extraInfo, updateExtras } = useCartUpdates(item);
  const [extraPrice, setExtraPrice] = useState(0);
  const selectedExtras = useRef<{ [category: string]: ExtraInfo }>({});
  const { displayNotification } = useNotification();

  const updateExtras = (category: string, extraInfo: ExtraInfo) => {
    const oldExtraPrice = selectedExtras.current[category]?.price || 0;
    const newExtraPrice = extraInfo.price || 0;
    const newPrice = newExtraPrice - oldExtraPrice;
    selectedExtras.current[category] = extraInfo;
    console.log("Update extra", category, extraInfo);
    setExtraPrice((prevPrice) => prevPrice + newPrice);
  };
  const addItemToCart = (amount: number) => {
    const cart = {
      items: {},
      totalItems: 0,
      price: "0",
      nextId: 0,
      status: "Complete",
    } as Cart;
    const res = checkItemExists(
      item.id,
      cart,
      toCartItemExtra(selectedExtras.current)
    );
    console.log("Add to cart", res);
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
}): CartItemExtra[] => {
  const cartExtras: CartItemExtra[] = [];
  Object.keys(extras).forEach((category) => {
    const { extra, price, id } = extras[category];
    cartExtras.push({ category, name: extra, price });
  });
  return cartExtras;
};
