import { ReactNode, createContext, useContext } from "react";
import { FunctionComponent } from "react";
import useHandleCart from "./hooks/useHandleCart";
import { getInitialContext } from "./utils";
import { CheckoutSection } from "@_types/cart";

const Cart = createContext(getInitialContext());

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: FunctionComponent<CartProviderProps> = ({ children }) => {
  const cartDetails = useHandleCart();
  const getIterableItems = () => {
    const { cart } = cartDetails;
    if (!cart?.items) return [];
    const menuItemIds = Object.keys(cart.items);
    const checkoutItems: CheckoutSection[] = [];
    menuItemIds.forEach((itemId) => {
      const section = cart.items[+itemId];
      const cartItemIds = Object.keys(section.items);
      const checkoutSection: CheckoutSection = {
        details: { ...section.details, itemId: +itemId },
        items: [],
      };
      cartItemIds.forEach((cartItemId) => {
        const item = section.items[+cartItemId];
        checkoutSection.items.push({ ...item, cartItemId: +cartItemId });
      });
      checkoutItems.push(checkoutSection);
    });
    return checkoutItems;
  };
  return (
    <Cart.Provider value={{ ...cartDetails, getIterableItems }}>
      {children}
    </Cart.Provider>
  );
};

export const useCart = () => useContext(Cart);

export default CartProvider;
