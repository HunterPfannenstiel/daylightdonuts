import {
  Cart,
  CartSectionDetails,
  CheckoutSection,
  NewCartItem,
} from "@_types/cart";

type CartModifiers = {
  addItemFromItemPage: (item: NewCartItem, details: CartSectionDetails) => void;
  updateItemFromCart: (
    itemId: number,
    cartItemId: number,
    amount: number
  ) => void;
  removeItemFromCart: (itemId: number, cartItemId: number) => void;
  clearCart: () => void;
};

export type CartContext = {
  cart: Cart | undefined;
  cartModifiers: CartModifiers;
  getIterableItems: () => CheckoutSection[];
  isLoading: boolean;
};

export const getInitialContext = (): CartContext => {
  const fn = () => {};
  return {
    cart: undefined,
    cartModifiers: {
      addItemFromItemPage: fn,
      updateItemFromCart: fn,
      removeItemFromCart: fn,
      clearCart: fn,
    },
    getIterableItems: () => [],
    isLoading: true,
  };
};

export const resetCart = (cartObj: Cart) => {
  cartObj.items = {};
  cartObj.totalItems = 0;
  cartObj.price = "0.00";
  cartObj.status = "Open";
  cartObj.nextId = 0;
};
