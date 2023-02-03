import useQueuedUpdates from "@_hooks/cart/useQueuedUpdates";
import { useNotification } from "@_providers/Notification/Notification";
import { PendingDBUpdates } from "@_types/database/cart";
import { updateItemsFromCart } from "@_utils/database/cart/modifiers/cartModifiers";
import { updateDBItemsFromCart } from "@_utils/database/cart/modifiers/dbModifiers";
import { useEffect, useState } from "react";
import { useCart } from "../optimistic";

const useUpdates = (resetTotals: () => void) => {
  const updates = useQueuedUpdates();
  const { modifyCart } = useCart();
  const { displayNotification } = useNotification();
  const [itemUpdates, setItemUpdates] = useState<PendingDBUpdates>();
  const [update, setUpdate] = useState(false);

  const triggerUpdates = () => {
    setUpdate(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (itemUpdates) {
      if (update) {
        displayNotification("Cart has been updated!", "success", 3000);
        updateDatabase();
      } else {
        timer = setTimeout(() => {
          displayNotification("Cart has been updated!", "success", 3000);
          updateDatabase();
        }, 10000);
      }
    } else {
      setUpdate(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [itemUpdates, update]);

  const updateDatabase = () => {
    modifyCart(
      updateItemsFromCart(
        updates.existingUpdates,
        updates.dozenUpdates,
        updates.dozenItemUpdates
      ),
      updateDBItemsFromCart(itemUpdates!),
      0
    );
    updates.resetUpdates();
    setItemUpdates(undefined);
    resetTotals();
  };

  return {
    updates,
    itemUpdates,
    setItemUpdates,
    triggerUpdates,
  };
};

export default useUpdates;
