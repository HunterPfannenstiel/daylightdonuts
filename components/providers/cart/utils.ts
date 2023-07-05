import {
  Cart,
  CartDatabaseUpdate,
  CartDatabaseUpdates,
  CartItem,
  CartItemExtra,
  CartSectionDetails,
  NewCartItem,
} from "@_types/cart";
import APIRequest from "custom-objects/Fetch";
import { MutableRefObject } from "react";

type ClientCartDelegate = (cart: Cart, dbUpdates: CartDatabaseUpdates) => void;

export type MutateCart = {
  clientDelegate: ClientCartDelegate;
  dbUpdates: () => CartDatabaseUpdate[];
  timer: MutableRefObject<NodeJS.Timeout>;
  delay: number;
};

export const initializeCart = (cart: Cart) => {
  let totalItems = 0;
  let totalPrice = 0;
  let nextId = 0;
  const itemIds = Object.keys(cart.items);
  itemIds.forEach((itemId) => {
    const itemSection = cart.items[+itemId];
    const cartItemIds = Object.keys(itemSection);
    cartItemIds.forEach((cartItemId) => {
      const item = cart.items[+itemId].items[+cartItemId];
      const extraPrice = calculateExtraPrice(item);
      if (extraPrice) item.extraPrice = extraPrice;
      totalItems += item.amount;
      totalPrice += +itemSection.details.price + extraPrice;
      nextId = Math.max(nextId, +cartItemId);
    });
  });
  cart.price = totalPrice.toFixed(2);
  cart.totalItems = totalItems;
  cart.nextId = nextId;
};

export const addNewItemAndSection =
  (item: NewCartItem, details: CartSectionDetails): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const cartItemId = cart.nextId;
    cart.items[item.id] = {
      items: { [cartItemId]: item },
      details,
    };
    cart.nextId++;
    const extraPrice = calculateExtraPrice(item);
    if (extraPrice) item.extraPrice = extraPrice;
    cart.price = (
      +cart.price +
      (+details.price + extraPrice) * item.amount
    ).toFixed(2);
    cart.totalItems += item.amount;
    const extraIds = item.extras?.map((extra) => extra.id);
    dbUpdates[cartItemId] = { itemId: item.id, amount: item.amount, extraIds };
  };

export const addNewItem =
  (item: NewCartItem): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const { details, items } = cart.items[item.id];
    const cartItemId = cart.nextId;
    items[cartItemId] = item;
    cart.nextId++;
    const extraPrice = calculateExtraPrice(item);
    if (extraPrice) item.extraPrice = extraPrice;
    cart.price = (
      +cart.price +
      (+details.price + extraPrice) * item.amount
    ).toFixed(2);
    cart.totalItems += item.amount;
    const extraIds = item.extras?.map((extra) => extra.id);
    dbUpdates[cartItemId] = { itemId: item.id, amount: item.amount, extraIds };
  };

export const updateExistingItem =
  (itemId: number, cartItemId: number, amount: number): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const { details, items } = cart.items[itemId];
    const item = items[cartItemId];
    const itemPrice = +details.price + item?.extraPrice! || 0;
    if (item.amount < 1) {
      delete cart.items[itemId].items[cartItemId];
    }
    cart.totalItems += amount;
    cart.price = (+cart.price + itemPrice * amount).toFixed(2);
    dbUpdates[cartItemId].amount += amount;
  };

export const removeItem =
  (itemId: number, cartItemId: number): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const { details, items } = cart.items[itemId];
    const { extraPrice, amount } = items[cartItemId];
    cart.price = (
      +cart.price -
      (+details.price + extraPrice! || 0) * amount
    ).toString(2);
    cart.totalItems -= amount;
    delete cart.items[itemId].items[cartItemId];
    dbUpdates[cartItemId] = { amount: -amount };
  };

const calculateExtraPrice = (item: CartItem) => {
  let itemPrice = 0;
  if (item.extras) {
    item.extras.forEach((extra) => {
      itemPrice += extra.price || 0;
    });
  }
  return itemPrice;
};

export const checkItemExists = (
  itemId: number,
  cart: Cart,
  extras?: CartItemExtra[]
) => {
  const section = cart.items[itemId];
  if (!section) return -2;
  const sectionKeys = Object.keys(section);
  for (let i = 0; i < sectionKeys.length; i++) {
    const cartItemId = +sectionKeys[i];
    const item = section.items[cartItemId];
    if (item.extras) {
      if (!extras) continue;
      if (item.extras.length !== extras.length) continue;
      for (let i = 0; i < item.extras.length; i++) {
        const extra = item.extras[i];
        const newItemExtra = extras[i];
        if (
          newItemExtra.category !== extra.category ||
          newItemExtra.name !== extra.name
        )
          break;
      }
      return cartItemId;
    } else if (!extras) return cartItemId;
  }
  return -1;
};

export const postCartUpdates = async ({
  dbUpdates,
  timer,
  delay,
}: MutateCart) => {
  clearTimeout(timer.current);
  return new Promise<string>(async (resolve, reject) => {
    timer.current = setTimeout(async () => {
      try {
        const { success, errorMessage } = await APIRequest.request(
          "/api/cart/modify",
          {
            method: "POST",
            body: JSON.stringify({ updates: dbUpdates() }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!success) {
          reject(errorMessage);
        } else {
          resolve("Update Successful");
        }
      } catch (e) {
        reject("Could not update cart");
      }
    }, delay);
  });
};
