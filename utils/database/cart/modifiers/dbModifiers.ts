import {
  NewCartItem,
  UpdateDB,
  UpdatedCartItem,
  DBModifier,
  PendingDBUpdates,
  ManyDBUpdates,
} from "@_types/database/cart";

export const addNewGroup = (): DBModifier => () => {};

export const addNewDBItem =
  (items: NewCartItem[]): DBModifier =>
  (updates) => {
    items.forEach((item) => {
      const index = checkIfExists(updates, item.cartItemId, "newItems");
      if (index === -1) {
        updates.newItems.push(item);
      } else {
        updates.newItems[index].amount += item.amount;
        updates.newItems[index].subtotal += item.subtotal;
      }
    });
  };

export const updateDBItem =
  (items: UpdatedCartItem[]): DBModifier =>
  (updates) => {
    items.forEach((item) => {
      const index = checkIfExists(updates, item.cartItemId, "updateItems");
      if (index === -1) {
        updates.updateItems.push(item);
      } else {
        updates.updateItems[index].updateAmount += item.updateAmount;
        updates.updateItems[index].subtotal += item.subtotal;
      }
    });
  };

export const updateManyDBItems =
  (newItems: NewCartItem[], existingItems: UpdatedCartItem[]): DBModifier =>
  (updates) => {
    addNewDBItem(newItems)(updates);
    updateDBItem(existingItems)(updates);
  };

export const updateDBItemsFromCart =
  (updates: PendingDBUpdates): DBModifier =>
  (cartUpdates) => {
    Object.keys(updates).forEach((cartItemId) => {
      cartUpdates.updateItems.push({
        cartItemId: +cartItemId,
        updateAmount: updates[cartItemId].updateAmount,
        subtotal: updates[cartItemId].subtotal,
      });
    });
  };

const checkIfExists = (
  updates: UpdateDB,
  cartItemId: number,
  section: "newItems" | "updateItems"
) => {
  return updates[section].findIndex((item) => item.cartItemId === cartItemId);
};

export const getInitialUpdates = () => {
  return {
    newItems: [],
    updateItems: [],
  } as UpdateDB;
};
