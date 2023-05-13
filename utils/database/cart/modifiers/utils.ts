import {
  AddItem,
  CartDictionary,
  CartItem,
  CartModifier,
  DBModifier,
  UpdatedCartItem,
} from "@_types/database/cart";
import {
  createDBEntry,
  getCartItemId,
  isGroupCreated,
  isInCart,
} from "../cart";
import { addCartGroup, addNewItem, updateExistingItem } from "./cartModifiers";
import { addDBUpdate } from "./dbModifiers";

export const addItemToCart = (
  groupName: string,
  groupSize: number,
  groupPrice: number,
  item: AddItem,
  itemId: string,
  cart: CartDictionary,
  nextItemId: number,
  extraIds: number[],
  incrementId: () => void
) => {
  let cartMod: CartModifier;
  let dbMod: DBModifier;
  if (!isInCart(groupName, itemId, cart)) {
    const cartEntry: CartItem = { ...item, cartItemId: nextItemId };

    const dbEntry = createDBEntry(nextItemId, item.id, item.amount, extraIds);
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

    dbMod = addDBUpdate([dbEntry]);
    incrementId();
  } else {
    cartMod = updateExistingItem(groupName, [{ itemId, amount: item.amount }]);
    dbMod = addDBUpdate([
      {
        cart_item_id: getCartItemId(cart.groups[groupName].items, itemId),
        amount: item.amount,
      },
    ]);
  }

  return [cartMod, dbMod] as [CartModifier, DBModifier];
};

export const getExistingDBEntry = (
  amount: number,
  cartItemId: number
): UpdatedCartItem => {
  return {
    cart_item_id: cartItemId,
    amount: amount,
  };
};
