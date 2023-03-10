import {
  AddItem,
  CartDictionary,
  CartItem,
  CartModifier,
  DBModifier,
  NewCartItem,
  UpdatedCartItem,
} from "@_types/database/cart";
import { DozenBoxItem } from "@_types/dozenable";
import {
  createDBEntry,
  getCartItemId,
  isGroupCreated,
  isInCart,
} from "../cart";
import { addCartGroup, addNewItem, updateExistingItem } from "./cartModifiers";
import { addNewDBItem, updateDBItem } from "./dbModifiers";

export const addItemToCart = (
  groupName: string,
  groupSize: number,
  groupPrice: number,
  item: AddItem,
  itemId: string,
  cart: CartDictionary,
  nextItemId: number,
  extraIds: number[],
  modifiedPrice: number | null,
  incrementId: () => void
) => {
  let cartMod: CartModifier;
  let dbMod: DBModifier;
  if (!isInCart(groupName, itemId, cart)) {
    const cartEntry: CartItem = { ...item, cartItemId: nextItemId };

    const dbEntry = createDBEntry(
      nextItemId,
      item.id,
      item.amount,
      item.amount * item.unitPrice,
      extraIds,
      modifiedPrice
    );
    if (!isGroupCreated(cart, groupName)) {
      cartMod = addCartGroup(
        groupName,
        groupSize,
        groupPrice,
        itemId,
        cartEntry
      );
    } else {
      cartMod = addNewItem(groupName, itemId, cartEntry);
    }

    dbMod = addNewDBItem([dbEntry]);
    incrementId();
  } else {
    cartMod = updateExistingItem(groupName, [{ itemId, amount: item.amount }]);
    dbMod = updateDBItem([
      {
        cartItemId: getCartItemId(cart.groups[groupName].items, itemId),
        updateAmount: item.amount,
        subtotal: item.amount * item.unitPrice,
      },
    ]);
  }

  return [cartMod, dbMod] as [CartModifier, DBModifier];
};

export const getExistingDBEntry = (
  amount: number,
  unitPrice: number,
  cartItemId: number
): UpdatedCartItem => {
  return {
    cartItemId,
    updateAmount: amount,
    subtotal: amount * unitPrice,
  };
};
