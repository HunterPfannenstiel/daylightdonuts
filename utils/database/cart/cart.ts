import {
  CartDictionary,
  CartExtraInfo,
  CartItem,
  Extra,
  Items,
  NewCartItem,
} from "@_types/database/cart";
import { Availability } from "@_types/database/menu";

export const getCartId = (menuId: number, extraIds: number[] | null[]) => {
  let id = menuId.toString();
  if (extraIds.length > 0) {
    extraIds.sort().forEach((extraId) => {
      if (extraId) {
        id += `-${extraId}`;
      } else {
        id += "-0";
      }
    });
  } else {
    id += "-0";
  }

  return id;
};

export const createCartEntry = (
  name: string,
  amount: number,
  cartItemId: number,
  unitPrice: number,
  image: string,
  extras: Extra[],
  availability: Availability
): CartItem => {
  return { name, amount, unitPrice, cartItemId, extras, image, availability };
};

export const createDBEntry = (
  cartItemId: number,
  menuItemId: number,
  amount: number,
  subtotal: number,
  extraIds: number[],
  extraPrice: number | null
): NewCartItem => {
  return { cartItemId, menuItemId, amount, subtotal, extraIds, extraPrice };
};

export const isGroupCreated = (cart: CartDictionary, groupName: string) => {
  return !!cart.groups[groupName];
};

export const isItemInCart = (items: Items, itemId: string) => {
  return !!items[itemId];
};
export const isInCart = (
  groupName: string,
  itemId: string,
  cart: CartDictionary
) => {
  if (isGroupCreated(cart, groupName)) {
    return isItemInCart(cart.groups[groupName].items, itemId);
  }
  return false;
};

export const getExtraInfo = (extras: CartExtraInfo): [number[], Extra[]] => {
  const ids: number[] = [];
  const extrasArr: Extra[] = [];

  Object.keys(extras).forEach((key) => {
    const extra = extras[key];
    ids.push(extra.id);
    extrasArr.push({ category: key, extra: extra.extra });
  });

  return [ids, extrasArr];
};

export const getCartItemId = (items: Items, itemId: string) => {
  return items[itemId].cartItemId;
};

export const getExtraString = (extras: Extra[] | [null]) => {
  let extraString = "";
  extras.forEach((extra) => {
    if (extra?.category && extra.extra && extra.extra !== "None") {
      extraString += `${extra.category}: ${extra.extra}\n`;
    }
  });

  return extraString;
};
