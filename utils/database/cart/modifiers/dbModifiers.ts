import {
  NewCartItem,
  UpdatedCartItem,
  DBModifier,
  PendingDBUpdates,
  ManyDBUpdates,
  UpdateCartItem,
} from "@_types/database/cart";

export const addNewGroup = (): DBModifier => () => {};

// export const addNewDBItem =
//   (items: NewCartItem[]): DBModifier =>
//   (updates) => {
//     items.forEach((item) => {
//       const index = checkIfExists(updates, item.cart_item_id);
//       if (index === -1) {
//         updates[index].amount += item.amount;
//       } else {
//         updates.push(item);
//       }
//     });
//   };

export const addDBUpdate =
  (items: UpdateCartItem[]): DBModifier =>
  (updates) => {
    items.forEach((item) => {
      const index = checkIfExists(updates, item.cart_item_id);
      if (index === -1) {
        updates[index].amount += item.amount;
      } else {
        updates.push(item);
      }
    });
  };

// export const updateDBItem =
//   (items: UpdatedCartItem[]): DBModifier =>
//   (updates) => {
//     items.forEach((item) => {
//       const index = checkIfExists(updates, item.cartItemId, "updateItems");
//       if (index === -1) {
//         updates.updateItems.push(item);
//       } else {
//         updates.updateItems[index].updateAmount += item.updateAmount;
//         updates.updateItems[index].subtotal += item.subtotal;
//       }
//     });
//   };

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
