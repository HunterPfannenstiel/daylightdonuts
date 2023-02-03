import { BoxContext, BoxPayload, DozenBox } from "@_types/dozenable";

export const getInitialBoxContext = (): BoxContext => {
  return {
    box: { boxSize: 0, currentCount: 0, items: {} },
    dispatchBox: (action: BoxPayload) => {},
    isItemInBox: (itemId: string) => {
      return false;
    },
    amountNeeded: 0,
    addBoxToCart: (amount?: number) => {},
  };
};

export const getInitialBox = (boxSize: number): DozenBox => {
  return { boxSize, currentCount: 0, items: {} };
};

export const addBoxToCart = (box: DozenBox, amount: number) => {};
