import {
  NewCartItem,
  UpdatedCartItem,
  DBModifier,
  PendingDBUpdates,
  UpdateCartItem,
} from "@_types/database/cart";

export const addNewGroup = (): DBModifier => () => {};

export const addDBUpdate =
  (items: UpdateCartItem[]): DBModifier =>
  (updates) => {
    items.forEach((item) => {
      const index = checkIfExists(updates, item.cart_item_id);
      if (index !== -1) {
        updates[index].amount += item.amount;
      } else {
        updates.push(item);
      }
    });
  };

export const updateManyDBItems =
  (newItems: NewCartItem[], existingItems: UpdatedCartItem[]): DBModifier =>
  (updates) => {
    addDBUpdate(newItems)(updates);
    addDBUpdate(existingItems)(updates);
  };

export const updateDBItemsFromCart =
  (updates: PendingDBUpdates): DBModifier =>
  (cartUpdates) => {
    Object.keys(updates).forEach((cartItemId) => {
      cartUpdates.push({
        cart_item_id: +cartItemId,
        amount: updates[cartItemId].updateAmount,
      });
    });
  };

const checkIfExists = (updates: UpdateCartItem[], cartItemId: number) => {
  return updates.findIndex((item) => item.cart_item_id === cartItemId);
};

export const getInitialUpdates = () => {
  return [] as UpdateCartItem[];
};
