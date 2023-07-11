import { CartDatabaseUpdate, CartDatabaseUpdates } from "@_types/cart";
import { useRef } from "react";

const useDatabaseUpdates = () => {
  const updates = useRef<CartDatabaseUpdates>({});

  const getAndResetUpdates = () => {
    console.log("RESETTING");
    const cartUpdates: CartDatabaseUpdate[] = Object.keys(updates.current).map(
      (cartItemId) => {
        const { amount, menu_item_id, extra_ids } =
          updates.current[+cartItemId];
        return { cart_item_id: +cartItemId, amount, menu_item_id, extra_ids };
      }
    );
    updates.current = {};
    return cartUpdates;
  };

  return { dbUpdates: updates, getAndResetUpdates };
};

export default useDatabaseUpdates;
