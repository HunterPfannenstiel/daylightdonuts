import { BoxPayload, DozenBox } from "@_types/dozenable";
import { ImmerReducer, useImmerReducer } from "use-immer";
import { getInitialBox } from "../../providers/Dozenable/utils";
import { useCart } from "@_providers/Cart";

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

const useBuildBox = (
  groupName: string,
  groupPrice: number,
  boxSize: number
) => {
  const [box, dispatch] = useImmerReducer<DozenBox, BoxPayload>(
    reducer,
    getInitialBox(boxSize)
  );
  const { addItemFromItemPage } = useCart().cartModifiers;

  const dispatchBox = (payload: BoxPayload) => {
    dispatch(payload);
  };

  const isItemInBox = (itemId: string) => {
    return !!box.items[itemId];
  };

  const addBoxToCart = (amount = 1) => {
    if (box.boxSize === box.currentCount) {
      Object.keys(box.items).forEach((key) => {
        const item = box.items[key];
        addItemFromItemPage(
          { id: item.id, amount: item.amount, extras: item.extras },
          {
            name: item.name,
            price: item.unitPrice.toFixed(2),
            imageUrl: item.image,
          }
        );
      });
    }
    console.log(box);
  };
  return {
    box,
    dispatchBox,
    isItemInBox,
    amountNeeded: box.boxSize - box.currentCount,
    addBoxToCart,
  };
};

export default useBuildBox;
