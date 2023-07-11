import { useCart } from "@_providers/old-cart/optimistic";
import { BoxPayload, DozenBox } from "@_types/dozenable";
import { getModifiers } from "@_utils/database/dozenable/helpers";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import { ImmerReducer, useImmerReducer } from "use-immer";
import { getInitialBox, getInitialBoxContext } from "./utils";

const BuildBox = createContext(getInitialBoxContext());

const reducer: ImmerReducer<DozenBox, BoxPayload> = (state, action) => {
  switch (action.type) {
    case "Update":
      state.items[action.itemId].amount += action.amount;
      state.currentCount += action.amount;
      if (state.items[action.itemId].amount === 0) {
        delete state.items[action.itemId];
      }
      break;
    case "New":
      state.items[action.itemId] = action.item;
      state.currentCount += action.item.amount;
      break;
    case "Clear":
      state = getInitialBox(action.boxSize);
      break;
  }

  return state;
};

interface BuildBoxProps {
  groupName: string;
  groupPrice: number;
  boxSize: number;
  children: ReactNode;
}

const BuildBoxProvider: FunctionComponent<BuildBoxProps> = ({
  groupName,
  groupPrice,
  boxSize,
  children,
}) => {
  const [box, dispatch] = useImmerReducer<DozenBox, BoxPayload>(
    reducer,
    getInitialBox(boxSize)
  );
  const { modifyCart, nextItemId, setNextItemId, cart } = useCart();

  const dispatchBox = (payload: BoxPayload) => {
    dispatch(payload);
  };

  const isItemInBox = (itemId: string) => {
    return !!box.items[itemId];
  };

  const addBoxToCart = (amount = 1) => {
    if (box.boxSize === box.currentCount) {
      const { cartMod, dbMod } = getModifiers(
        groupName,
        groupPrice,
        box,
        amount,
        nextItemId,
        cart!,
        setNextItemId
      );

      modifyCart(cartMod, dbMod, 0);
    }
  };

  const value = {
    box,
    dispatchBox,
    isItemInBox,
    amountNeeded: box.boxSize - box.currentCount,
    addBoxToCart,
  };

  return <BuildBox.Provider value={value}>{children}</BuildBox.Provider>;
};

export default BuildBoxProvider;

export const useBuildBox = () => {
  return useContext(BuildBox);
};
