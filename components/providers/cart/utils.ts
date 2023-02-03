import {
  CartDictionary,
  CartModifier,
  CartState,
  DBCartItem,
  MutateCart,
  UpdateDB,
} from "@_types/database/cart";
import {
  createCartEntry,
  getCartId,
  isGroupCreated,
} from "@_utils/database/cart/cart";
import {
  addCartGroup,
  addNewItem,
  initializeCart,
} from "@_utils/database/cart/modifiers/cartModifiers";
import { Dispatch, SetStateAction } from "react";

export const getInitialState = async (
  savedCart: DBCartItem[]
): Promise<[CartModifier, number]> => {
  let cart = getDefaultCart();
  let nextItemId = 0;

  if (savedCart.length !== 0) {
    nextItemId = getNextItemId(savedCart);
    addItems(cart, savedCart);
  }

  return [initializeCart(cart), nextItemId];
};

const addItems = (cart: CartDictionary, cartItems: DBCartItem[]) => {
  cartItems.forEach((item) => {
    const groupId =
      item.extraprice || !item.groupname ? NO_GROUP : item.groupname;
    let price: number;
    if (item.extraprice) {
      price = item.extraprice;
    } else {
      price = moneyToNum(item.unitprice);
    }

    const cartEntry = createCartEntry(
      item.name,
      item.amount,
      item.cartitemid,
      price,
      item.image,
      item.extras,
      item.availability
    );
    if (!isGroupCreated(cart, groupId)) {
      if (groupId === NO_GROUP) {
        addCartGroup(
          groupId,
          0,
          0,
          getCartId(item.menuitemid, item.extraids),
          cartEntry
        )(cart);
      } else {
        addCartGroup(
          groupId,
          item.groupsize!,
          moneyToNum(item.groupprice!),
          getCartId(item.menuitemid, item.extraids),
          cartEntry
        )(cart);
      }
    } else {
      addNewItem(
        groupId,
        getCartId(item.menuitemid, item.extraids),
        cartEntry
      )(cart);
    }
  });
};

export const getDefaultCart = () => {
  return {
    totalItems: 0,
    totalPrice: 0,
    groups: {},
  } as CartDictionary;
};

const getNextItemId = (cartItems: DBCartItem[]) => {
  let lastId = cartItems[cartItems.length - 1].cartitemid;
  return lastId + 1;
};

export const getInitialContext = () => {
  return {
    cart: getDefaultCart(),
    nextItemId: 0,
    isLoading: true,
  } as CartState;
};

export const moneyToNum = (money: string) => {
  return +money.replace("$", "");
};

export const NO_GROUP = "NULL";

export const fetchCart = async (
  setNextId: Dispatch<SetStateAction<number>>
) => {
  const response = await fetch("/api/cart/fetchCart");
  const savedCart = (await response.json()) as DBCartItem[];
  const cart = getDefaultCart();
  const [initialCart, cartId] = await getInitialState(savedCart);
  initialCart(cart);
  setNextId(cartId);
  return cart;
};

export const updateCart = async ({
  updates,
  timer,
  timeoutTime,
}: MutateCart) => {
  clearTimeout(timer.current);
  return new Promise<string>(async (resolve, reject) => {
    timer.current = setTimeout(async () => {
      try {
        const response = await postCart(updates);
        if (!response.ok) {
          const message = await response.json();
          reject(message.message);
        } else {
          resolve("Update Successful");
        }
      } catch (e) {
        reject("Could not update cart");
      }
    }, timeoutTime);
  });
};

export const postCart = (updates: UpdateDB) => {
  return fetch("/api/cart/modify", {
    method: "POST",
    body: JSON.stringify({ updates }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
