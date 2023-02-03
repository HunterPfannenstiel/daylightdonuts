import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  CartDictionary,
  CartModifier,
  DBModifier,
  MutateCart,
} from "@_types/database/cart";
import useDBUpdate from "./useDBUpdate";
import { fetchCart, getDefaultCart, updateCart } from "./utils";
import clone from "lodash.clonedeep";
import { useState } from "react";
import { useNotification } from "@_providers/Notification/Notification";

const useCart = () => {
  const [nextItemId, setNextItemId] = useState(0);
  const { data: cart }: UseQueryResult<CartDictionary> =
    useQuery<CartDictionary>(["cart"], () => {
      return fetchCart(setNextItemId);
    });
  const queryClient = useQueryClient();
  const dbUpdates = useDBUpdate();
  const [rollback, setRollback] = useState<{ previousCart: CartDictionary }>();
  const { displayNotification } = useNotification();

  const mutation = useMutation<
    string,
    string,
    MutateCart,
    { previousCart: CartDictionary }
  >(updateCart, {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["cart"]);
      const previousCart = queryClient.getQueryData(["cart"]) as CartDictionary;

      queryClient.setQueryData<CartDictionary>(["cart"], (prevCart) => {
        if (prevCart) {
          const cCart = clone(prevCart);
          variables.cartModifier(cCart);
          return cCart;
        } else {
          return getDefaultCart();
        }
      });
      if (!dbUpdates.isUpdatePending) {
        setRollback({ previousCart });
        return { previousCart };
      } else {
        return rollback;
      }
    },

    onError: (error, _variables, context) => {
      if (context) {
        displayNotification(
          "An error occurred while updating the cart, rolling back to previous version",
          "error",
          5000
        );
        queryClient.setQueryData(["cart"], context.previousCart);
      } else {
        displayNotification(
          "This error should not have occurred, please refresh to view cart",
          "error",
          5000
        );
        queryClient.setQueryData(["cart"], getDefaultCart());
      }

      dbUpdates.setPending(false);
      dbUpdates.resetUpdates();
    },

    onSuccess: () => {
      dbUpdates.setPending(false);
      dbUpdates.resetUpdates();
      // displayNotification(
      //   "Cart has been posted to the database",
      //   "success",
      //   5000
      // );
    },
  });

  const modifyCart = (
    cartModifier: CartModifier,
    dbModifier: DBModifier,
    timeoutTime: number
  ) => {
    dbUpdates.addUpdates(dbModifier);
    mutation.mutate({
      updates: dbUpdates.updates,
      timer: dbUpdates.timer,
      timeoutTime,
      cartModifier,
    });
  };

  return { cart, modifyCart, nextItemId, setNextItemId };
};

export default useCart;
