import { extraToString } from "@_providers/Cart/hooks/utils";
import { NewCartItemExtra } from "@_types/cart";
import {
  CartDictionary,
  CartExtraInfo,
  CartItem,
  Extra,
  Items,
  NewCartItem,
} from "@_types/database/cart";
import { Availability } from "@_types/database/menu";

export const getCartId = (menuId: number, extraIds: number[]) => {
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
  extraIds: number[]
): NewCartItem => {
  return {
    cart_item_id: cartItemId,
    menu_item_id: menuItemId,
    amount,
    extra_ids: extraIds,
  };
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

/**
 *
 * @param extras The selected extras of a menu item
 * @returns The parsed extras returned as an id array of the database ids and as an extra array for the cart
 */
export const getExtraInfo = (
  extras: CartExtraInfo
): [number[], NewCartItemExtra[]] => {
  const ids: number[] = [];
  const extrasArr: NewCartItemExtra[] = [];

  Object.keys(extras).forEach((key) => {
    const extra = extras[key];
    ids.push(extra.id);
    extrasArr.push({
      text: extraToString(key, extra.extra) || "",
      id: extra.id,
    });
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
