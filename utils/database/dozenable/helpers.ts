import {
  CartDictionary,
  CartDozenItem,
  CartItem,
  NewCartItem,
  UpdatedCartItem,
} from "@_types/database/cart";
import { DozenBox, DozenBoxItem, DozenBoxUpdateItem } from "@_types/dozenable";
import { getCartItemId, isGroupCreated, isItemInCart } from "../cart/cart";
import { updateCartWithBox } from "../cart/modifiers/cartModifiers";
import { updateManyDBItems } from "../cart/modifiers/dbModifiers";
import { getExistingDBEntry } from "../cart/modifiers/utils";

export const updateDozenable = (
  groupName: string,
  box: DozenBox,
  amount: number,
  nextItemId: number,
  cart: CartDictionary,
  setItemId: (newId: number) => void
) => {
  let groupCreated = true;
  const newDBItems: NewCartItem[] = [];
  const existingItems: UpdatedCartItem[] = [];
  const newCartItems: DozenBoxUpdateItem[] = [];
  const dozen: CartDozenItem[] = [];
  if (!isGroupCreated(cart, groupName)) {
    groupCreated = false;
    Object.keys(box.items).forEach((itemId) => {
      const item = box.items[itemId];
      const newDBItem = addNewCartItem(
        newCartItems,
        item,
        itemId,
        nextItemId,
        amount
      );
      newDBItems.push(newDBItem);
      dozen.push({ id: itemId, item: { ...item, cartItemId: nextItemId } });
      nextItemId += 1;
    });
  } else {
    Object.keys(box.items).forEach((itemId) => {
      const item = box.items[itemId];
      let cartItemId = nextItemId;
      if (!isItemInCart(cart.groups[groupName].items, itemId)) {
        const newDBItem = addNewCartItem(
          newCartItems,
          item,
          itemId,
          nextItemId,
          amount
        );
        newDBItems.push(newDBItem);
        nextItemId += 1;
      } else {
        cartItemId = getCartItemId(cart.groups[groupName].items, itemId);
        existingItems.push(getExistingDBEntry(item.amount, cartItemId));
      }
      dozen.push({ id: itemId, item: { ...item, cartItemId } });
    });
  }
  setItemId(nextItemId);
  return { newDBItems, existingItems, newCartItems, dozen, groupCreated };
};

const createNewBoxItemEntry = (
  item: DozenBoxItem,
  nextItemId: number,
  boxAmount: number
): [CartItem, NewCartItem] => {
  let { name, unitPrice, extras, availability, image } = item;
  return [
    {
      name,
      amount: 0,
      unitPrice,
      cartItemId: nextItemId,
      extras,
      image,
      availability,
    },
    getDBEntry(item, nextItemId, boxAmount),
  ];
};

const getDBEntry = (
  item: DozenBoxItem,
  nextItemId: number,
  boxAmount: number
): NewCartItem => {
  return {
    cart_item_id: nextItemId,
    menu_item_id: item.id,
    amount: item.amount * boxAmount,
    extra_ids: item.extraIds,
  };
};

const addNewCartItem = (
  newCartItems: DozenBoxUpdateItem[],
  item: DozenBoxItem,
  itemId: string,
  nextId: number,
  boxAmount: number
) => {
  const [cartItem, newCartItem] = createNewBoxItemEntry(
    item,
    nextId,
    boxAmount
  );
  newCartItems.push({ itemId, item: cartItem });
  return newCartItem;
};

export const getModifiers = (
  groupName: string,
  groupPrice: number,
  box: DozenBox,
  amount: number,
  nextItemId: number,
  cart: CartDictionary,
  setNextItemId: (num: number) => void
) => {
  const boxUpdates = updateDozenable(
    groupName,
    box,
    amount,
    nextItemId,
    cart!,
    setNextItemId
  );
  const cartMod = updateCartWithBox(
    groupName,
    box.boxSize,
    groupPrice,
    boxUpdates.groupCreated,
    boxUpdates.newCartItems,
    boxUpdates.dozen,
    amount
  );

  const dbMod = updateManyDBItems(
    boxUpdates.newDBItems,
    boxUpdates.existingItems
  );

  return { cartMod, dbMod };
};
