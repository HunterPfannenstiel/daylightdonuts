import {
  DozenDBItem,
  DozenUpdate,
  PendingDBUpdates,
  UpdateItem,
} from "@_types/database/cart";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import useUpdates from "./useUpdates";
import { getInitialContext } from "./utils";

const CartUpdates = createContext(getInitialContext());

export const CartUpdatesProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [modifiedItems, setModifiedItems] = useState(0);
  const [modifiedPrice, setModifiedPrice] = useState(0);
  const resetCartTotals = () => {
    setModifiedItems(0);
    setModifiedPrice(0);
  };
  const { updates, itemUpdates, setItemUpdates, triggerUpdates } =
    useUpdates(resetCartTotals);
  const handleCartTotals = (modifyPrice: number, modifyItems: number) => {
    setModifiedItems((prevState) => prevState + modifyItems);
    setModifiedPrice((prevState) => prevState + modifyPrice);
  };
  const handleItemUpdate = (
    modifyPrice: number,
    modifyItems: number,
    cartItemId: string,
    groupId: string,
    update: UpdateItem
  ) => {
    handleCartTotals(modifyPrice, modifyItems);
    updates.updateExisitingUpdates(groupId, update);
    addDBUpdate(cartItemId, modifyPrice, modifyItems);
  };

  const handleDozenUpdate = (
    modifyPrice: number,
    modifyItems: number,
    groupId: string,
    update: DozenUpdate,
    dozenItems: DozenDBItem[]
  ) => {
    handleCartTotals(modifyPrice, modifyItems);
    updates.updateDozenUpdates(groupId, update);
    setItemUpdates((prevState) => {
      return getDBEntriesFromDozen(dozenItems, prevState);
    });
  };

  const handleDozenItemUpdate = (
    modifyPrice: number,
    modifyItems: number,
    groupId: string,
    dozenId: string,
    cartItemId: string,
    update: UpdateItem
  ) => {
    handleCartTotals(modifyPrice, modifyItems);
    addDBUpdate(cartItemId, modifyPrice, modifyItems);
    updates.updateDozenItemUpdates(groupId, dozenId, update);
  };

  const addDBUpdate = (
    cartItemId: string,
    modifyPrice: number,
    modifyItems: number
  ) => {
    if (itemUpdates) {
      const update = { ...itemUpdates[cartItemId] };
      if (update.subtotal) {
        update.subtotal += modifyPrice;
        update.updateAmount += modifyItems;
        setItemUpdates((prevState) => {
          return { ...prevState, [cartItemId]: update };
        });
      } else {
        setItemUpdates((prevState) => {
          return {
            ...prevState,
            [cartItemId]: { subtotal: modifyPrice, updateAmount: modifyItems },
          };
        });
      }
    } else {
      setItemUpdates((prevState) => {
        return {
          ...prevState,
          [cartItemId]: { subtotal: modifyPrice, updateAmount: modifyItems },
        };
      });
    }
  };

  const value = {
    modifiedPrice,
    modifiedItems,
    handleItemUpdate,
    handleDozenUpdate,
    handleDozenItemUpdate,
    triggerUpdates,
    isPendingUpdates: !!itemUpdates,
  };

  return <CartUpdates.Provider value={value}>{children}</CartUpdates.Provider>;
};

export const useCartUpdates = () => {
  return useContext(CartUpdates);
};

const getDBEntriesFromDozen = (
  dozenItems: DozenDBItem[],
  itemUpdates: PendingDBUpdates | undefined
) => {
  let currentUpdates = { ...itemUpdates };
  dozenItems.forEach((item) => {
    let currentUpdate = { ...currentUpdates[item.cartItemId] };
    if (currentUpdate.subtotal) {
      currentUpdate.subtotal += item.modifyPrice;
      currentUpdate.updateAmount += item.modifyItems;
      currentUpdates[item.cartItemId] = currentUpdate;
    } else {
      currentUpdates[item.cartItemId] = {
        subtotal: item.modifyPrice,
        updateAmount: item.modifyItems,
      };
    }
  });
  return currentUpdates;
};
