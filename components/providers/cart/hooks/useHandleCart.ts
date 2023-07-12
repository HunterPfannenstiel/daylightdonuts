import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchCart from "./useFetchCart";
import {
  addNewItem,
  addNewItemAndSection,
  checkItemExists,
  clearCart,
  postCartUpdates,
  removeItem,
  updateExistingItem,
} from "./utils";
import clone from "lodash.clonedeep";
import { Cart, CartSectionDetails, NewCartItem } from "@_types/cart";
import useDatabaseUpdates from "./useDatabaseUpdates";
import { useRef } from "react";
import { useNotification } from "@_providers/Notification/Notification";

const useHandleCart = () => {
  const { cart, queryKey, isLoading } = useFetchCart();
  const { dbUpdates, getAndResetUpdates } = useDatabaseUpdates();
  const { displayNotification } = useNotification();
  const updateTimer = useRef(setTimeout(() => {}));
  const rollbackCart = useRef<Cart>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postCartUpdates, {
    onMutate: async ({ clientDelegate }) => {
      await queryClient.cancelQueries(queryKey);
      const previousCart = queryClient.getQueryData(queryKey) as
        | Cart
        | undefined;
      queryClient.setQueryData<Cart | undefined>(queryKey, (prevCart) => {
        if (prevCart) {
          const copyCart = clone(prevCart);
          clientDelegate(copyCart, dbUpdates);
          return copyCart;
        }
      });

      if (!rollbackCart.current) {
        rollbackCart.current = previousCart;
        return previousCart;
      } else {
        return rollbackCart.current;
      }
    },
    onError: (error, _variables, context) => {
      if (context) {
        displayNotification(
          "An error occurred while updating the cart, rolling back to previous version",
          "error",
          5000
        );
        queryClient.setQueryData<Cart>(queryKey, context);
      } else {
        //Most likely an error with the cart modifier logic that needs to be fixed
        displayNotification(
          "This error should not have occurred, please refresh to view cart",
          "error",
          5000
        );
        queryClient.setQueryData<Cart>(queryKey, {
          items: {},
          totalItems: 0,
          price: "0",
          status: "Open",
          nextId: 0,
        });
      }
      getAndResetUpdates();
    },
    onSuccess: () => {
      rollbackCart.current = undefined;
      console.log("SUCCESS");
    },
  });

  const addItemFromItemPage = (
    item: NewCartItem,
    details: CartSectionDetails
  ) => {
    if (!cart) {
      //display loading cart...
      return;
    }
    let clientDelegate: any;
    const cartItemId = checkItemExists(item.id, cart, item.extras);
    if (cartItemId === -2) {
      //Section doesn't exist
      clientDelegate = addNewItemAndSection(item, details);
    } else if (cartItemId === -1) {
      //Specific item doesn't exist
      clientDelegate = addNewItem(item);
    } else {
      clientDelegate = updateExistingItem(item.id, cartItemId, item.amount);
    }
    mutate({
      clientDelegate,
      dbUpdates: getAndResetUpdates,
      timer: updateTimer,
      delay: 1000,
    });
  };

  const updateItemFromCart = (
    itemId: number,
    cartItemId: number,
    amount: number
  ) => {
    mutate({
      clientDelegate: updateExistingItem(itemId, cartItemId, amount),
      dbUpdates: getAndResetUpdates,
      timer: updateTimer,
      delay: 1000,
    });
  };

  const removeItemFromCart = (itemId: number, cartItemId: number) => {
    mutate({
      clientDelegate: removeItem(itemId, cartItemId),
      dbUpdates: getAndResetUpdates,
      timer: updateTimer,
      delay: 1000,
    });
  };

  const deleteCart = () => {
    mutate({
      clientDelegate: clearCart(),
      dbUpdates: () => [],
      timer: updateTimer,
      delay: 0,
    });
  };
  return {
    cart,
    isLoading,
    cartModifiers: {
      addItemFromItemPage,
      updateItemFromCart,
      removeItemFromCart,
      clearCart: deleteCart,
    },
  };
};

export default useHandleCart;
