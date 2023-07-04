import {
  CartDictionary,
  CartModifier,
  CartState,
  DBCartItem,
} from "@_types/database/cart";
import {
  createContext,
  FunctionComponent,
  Reducer,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getDefaultCart, getInitialContext, getInitialState } from "./utils";

const Cart = createContext<CartState>(getInitialContext());

interface Props {
  children: React.ReactNode;
}

const cartReducer: Reducer<CartDictionary, CartModifier> = (
  cart,
  modifyCart
) => {
  modifyCart(cart);
  return { ...cart };
};

export const CartProvider: FunctionComponent<Props> = ({ children }) => {
  const [nextItemId, setNextItemId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, dispatchCart] = useReducer<
    Reducer<CartDictionary, CartModifier>
  >(cartReducer, getDefaultCart());

  useEffect(() => {
    if (isLoading) {
      setInitialState();
    }
  }, []);

  const setInitialState = async () => {
    const response = await fetch("/api/fetchCart");
    const savedCart = (await response.json()) as DBCartItem[];
    const [initialCart, nextId] = await getInitialState(savedCart);
    dispatchCart(initialCart);
    setNextItemId(nextId);
    setIsLoading(false);
  };

  const modifyCart = (cartModifier: CartModifier) => {
    dispatchCart(cartModifier);
  };

  const incrementId = () => {
    setNextItemId((prevState) => prevState++);
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
