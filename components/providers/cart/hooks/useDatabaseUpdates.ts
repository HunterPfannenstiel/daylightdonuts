import { CartDatabaseUpdate, CartDatabaseUpdates } from "@_types/cart";
import { useRef } from "react";

const useDatabaseUpdates = () => {
  const updates = useRef<CartDatabaseUpdates>({});

  //   const addUpdate = (
  //     cartItemId: number,
  //     amount: number,
  //     itemId?: number,
  //     extraIds: number[] = []
  //   ) => {
  //     if (itemId) {
  //       updates.current[cartItemId] = { amount, itemId, extraIds };
  //     } else {
  //       if (updates.current[cartItemId]) {
  //         updates.current[cartItemId].amount += amount;
  //       } else {
  //         updates.current[cartItemId] = { amount };
  //       }
  //     }
  //   };

  const getAndResetUpdates = () => {
    const cartUpdates: CartDatabaseUpdate[] = Object.keys(updates.current).map(
      (cartItemId) => {
        const { amount, itemId, extraIds } = updates.current[+cartItemId];
        return { cartItemId: +cartItemId, amount, itemId, extraIds };
      }
    );
    updates.current = {};
    return cartUpdates;
  };

  return { dbUpdates: updates.current, getAndResetUpdates };
};

export default useDatabaseUpdates;
