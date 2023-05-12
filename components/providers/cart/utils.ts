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
    let extraPrice = 0;
    if (item.extra_info !== null) {
      extraPrice = item.extra_info.price;
    }
    const groupId =
      extraPrice !== 0 || !item.group_name ? NO_GROUP : item.group_name;
    const price = item.unit_price + extraPrice;

    const cartEntry = createCartEntry(
      item.name,
      item.amount,
      item.cart_item_id,
      price,
      item.image,
      item.extra_info === null ? [] : item.extra_info.info,
      item.availability
    );
    const extraIds = item.extra_info === null ? [] : item.extra_info.ids;
    if (!isGroupCreated(cart, groupId)) {
      if (groupId === NO_GROUP) {
        addCartGroup(
          groupId,
          0,
          0,
          getCartId(item.menu_item_id, extraIds),
          cartEntry
        )(cart);
      } else {
        addCartGroup(
          groupId,
          item.group_size!,
          item.group_price!,
          getCartId(item.menu_item_id, extraIds),
          cartEntry
        )(cart);
      }
    } else {
      addNewItem(
        groupId,
        getCartId(item.menu_item_id, extraIds),
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
  let lastId = cartItems[cartItems.length - 1].cart_item_id;
  return lastId + 1;
};

export const getInitialContext = () => {
  return {
    cart: getDefaultCart(),
    nextItemId: 0,
    isLoading: true,
  } as CartState;
};

// export const moneyToNum = (money: string) => {
//   return +money.replace("$", "");
// };

export const NO_GROUP = "NULL";

export const fetchCart = async (
  setNextId: Dispatch<SetStateAction<number>>
) => {
  const response = await fetch("/api/cart/fetch-cart");
  let savedCart: DBCartItem[] = [];
  if (!response.ok) console.error("Invalid response when fetching cart");
  else {
    const data = (await response.json()) as {
      cart: DBCartItem[];
      isPending: boolean;
    };
    savedCart = data.cart;
  }
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
