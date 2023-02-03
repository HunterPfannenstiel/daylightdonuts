import { CartState } from "@_types/database/cart";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import useCartState from "./useCartState";
import { getInitialContext } from "./utils";

const Cart = createContext<CartState>(getInitialContext());

interface Props {
  children: React.ReactNode;
}

export const CartProvider: FunctionComponent<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { cart, modifyCart, nextItemId, setNextItemId } = useCartState();
  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  const incrementId = () => {
    setNextItemId((prevState) => {
      return prevState + 1;
    });
  };

  const value = {
    cart,
    modifyCart,
    nextItemId,
    incrementId,
    setNextItemId,
    isLoading,
  };

  return <Cart.Provider value={value}>{children}</Cart.Provider>;
};

export const useCart = () => {
  return useContext(Cart);
};
