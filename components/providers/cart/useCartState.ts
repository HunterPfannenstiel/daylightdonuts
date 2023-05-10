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
      //cancel outgoing queries refetches so the optimistic state doesn't mess up
      await queryClient.cancelQueries(["cart"]);

      //get the current state of the cart if a rever is needed
      const previousCart = queryClient.getQueryData(["cart"]) as CartDictionary;

      //set the state to the new cart after using the cart modifier on it
      queryClient.setQueryData<CartDictionary>(["cart"], (prevCart) => {
        if (prevCart) {
          const cCart = clone(prevCart);
          variables.cartModifier(cCart);
          return cCart;
        } else {
          console.log("Is cart loaded yet?");
          return getDefaultCart();
        }
      });
      //If the newly added item is the first in the batch, set the previous cart as the roll back, else keep the old rollback cart
      if (!dbUpdates.isUpdatePending) {
        setRollback({ previousCart });
        return { previousCart };
      } else {
        return rollback;
      }
    },

    onError: (error, _variables, context) => {
      //Most likely a DB fail or server failure
      if (context) {
        displayNotification(
          "An error occurred while updating the cart, rolling back to previous version",
          "error",
          5000
        );
        queryClient.setQueryData(["cart"], context.previousCart);
      } else {
        //Most likely an error with the cart modifier logic that needs to be fixed
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
    //Add new updates to the queue
    dbUpdates.addUpdates(dbModifier);
    //Mutate the state with cart modifier and pass in db updates
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
