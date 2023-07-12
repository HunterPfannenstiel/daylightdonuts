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
import { getInitialCart } from "../utils";

type ClientCartDelegate = (
  cart: Cart,
  dbUpdates: MutableRefObject<CartDatabaseUpdates>
) => void;

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
    const cartItemIds = Object.keys(itemSection.items);
    cartItemIds.forEach((cartItemId) => {
      const item = cart.items[+itemId].items[+cartItemId];
      const extraPrice = calculateExtraPrice(item);
      if (extraPrice) item.extraPrice = extraPrice;
      totalItems += item.amount;
      totalPrice += (+itemSection.details.price + extraPrice) * item.amount;
      nextId = Math.max(nextId, +cartItemId);
    });
  });
  cart.price = totalPrice.toFixed(2);
  cart.totalItems = totalItems;
  cart.nextId = nextId + 1;
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
    dbUpdates.current[cartItemId] = {
      menu_item_id: item.id,
      amount: item.amount,
      extra_ids: extraIds,
    };
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
    dbUpdates.current[cartItemId] = {
      menu_item_id: item.id,
      amount: item.amount,
      extra_ids: extraIds,
    };
  };

export const updateExistingItem =
  (itemId: number, cartItemId: number, amount: number): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const { details, items } = cart.items[itemId];
    const item = items[cartItemId];
    item.amount += amount;
    const itemPrice = +details.price + (item?.extraPrice! || 0);
    if (item.amount < 1) {
      delete cart.items[itemId].items[cartItemId];
    }
    cart.totalItems += amount;
    console.log("New price", (+cart.price + itemPrice * amount).toFixed(2));
    cart.price = (+cart.price + itemPrice * amount).toFixed(2);
    if (dbUpdates.current[cartItemId]) {
      dbUpdates.current[cartItemId].amount += amount;
    } else {
      dbUpdates.current[cartItemId] = { amount };
    }
  };

export const removeItem =
  (itemId: number, cartItemId: number): ClientCartDelegate =>
  (cart, dbUpdates) => {
    const { details, items } = cart.items[itemId];
    const { extraPrice, amount } = items[cartItemId];

    cart.price = (
      +cart.price -
      (+details.price + (extraPrice || 0)) * amount
    ).toString(2);
    cart.totalItems -= amount;
    delete cart.items[itemId].items[cartItemId];
    dbUpdates.current[cartItemId] = { amount: -amount };
  };

export const clearCart = (): ClientCartDelegate => (cart, dbUpdates) => {
  cart = getInitialCart();
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
  const sectionKeys = Object.keys(section.items);
  for (let i = 0; i < sectionKeys.length; i++) {
    const cartItemId = +sectionKeys[i];
    const item = section.items[cartItemId];
    if (item.extras) {
      if (!extras) continue;
      if (item.extras.length !== extras.length) continue;
      let found = true;
      for (let i = 0; i < extras.length; i++) {
        const newItemExtra = extras[i];
        const index = item.extras!.findIndex((extra) => {
          return extra.text === newItemExtra.text;
        });
        if (index === -1) {
          found = false;
          break;
        }
      }
      if (found) return cartItemId;
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
        console.log("SENDING REQUEST");
        const updates = dbUpdates();
        if (updates.length === 0) resolve("Cleared Cart");
        else {
          const { success, errorMessage } = await APIRequest.request(
            "/api/cart/modify",
            {
              method: "POST",
              body: JSON.stringify({ updates }),
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
        }
      } catch (e) {
        reject("Could not update cart");
      }
    }, delay);
  });
};

export const extraToString = (category: string, extra: string) => {
  if (extra === "None") return undefined;
  return extra + " " + category;
};
