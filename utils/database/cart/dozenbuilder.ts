import {
  CartDozenItem,
  CartDozens,
  CartGroup,
  DozenableItem,
  Items,
} from "@_types/database/cart";

export const createDozens = (
  groupSize: number,
  totalItems: number,
  items: DozenableItem[]
) => {
  const completeBoxes: CartDozens = {};
  let currentBox: CartDozenItem[] = [];
  let boxesMade = 0;
  let boxesNeeded = Math.floor(totalItems / groupSize);
  let donutsNeeded = groupSize;

  items.forEach((item) => {
    if (boxesMade != boxesNeeded) {
      let { amount } = item.item;
      if (donutsNeeded >= amount) {
        donutsNeeded -= amount;
        //Make sure this doesn't keep the reference and have an 'amount' of 0 when testing
        currentBox.push({ id: item.id, item: { ...item.item } });
        item.item.amount = 0;
        if (donutsNeeded == 0) {
          createBox(completeBoxes, currentBox, 1);
          currentBox = [];
          boxesMade++;
          donutsNeeded = groupSize;
        }
      } else {
        //'donutsNeeded' isn't always group size so we have to do this first
        let dozenItem = { ...item.item, amount: donutsNeeded }; //2
        item.item.amount -= donutsNeeded; //4
        currentBox.push({ id: item.id, item: dozenItem });
        createBox(completeBoxes, currentBox, 1);
        currentBox = [];
        boxesMade++;
        donutsNeeded = groupSize; //2
        if (boxesMade != boxesNeeded) {
          let dozensToMake = Math.floor(item.item.amount / groupSize);
          if (dozensToMake > 0) {
            dozenItem = { ...dozenItem, amount: groupSize };
            createBox(
              completeBoxes,
              [{ id: item.id, item: dozenItem }],
              dozensToMake
            );
            item.item.amount -= dozensToMake * groupSize;
            boxesMade += dozensToMake;
          }
          if (boxesMade != boxesNeeded) {
            const newAmount = item.item.amount % groupSize;
            if (newAmount > 0) {
              dozenItem = { ...dozenItem, amount: newAmount };
              item.item.amount = 0;

              currentBox.push({ id: item.id, item: dozenItem });
              donutsNeeded -= dozenItem.amount;
            }
          } else {
            item.item.amount = item.item.amount % groupSize;
          }
          //Check if more dozens are to be made, if so add the '%' to the current dozen else, update the item to have the '%' total
        }
      }
    }
  });

  return completeBoxes;
};

export const getAllItemsToGroup = (items: Items) => {
  const cartItems: DozenableItem[] = [];
  for (const key in items) {
    const item = items[key];
    if (item.amount > 0) {
      cartItems.push({ item, id: key });
    }
  }
  return cartItems;
};

const createBox = (
  completeBoxes: CartDozens,
  items: CartDozenItem[],
  amount: number
): void => {
  let box = completeBoxes[getDozenId(items)];
  if (!box) {
    completeBoxes[getDozenId(items)] = { amount, items };
  } else {
    box.amount += amount;
  }
};

export const getDozenId = (items: CartDozenItem[]) => {
  return `${items.map((item) => {
    return `${item.id}-${item.item.amount}-`;
  })}`;
};

export const addToDozens = (cartSection: CartGroup, newDozens: CartDozens) => {
  const { dozens } = cartSection;
  Object.keys(newDozens).forEach((key) => {
    if (dozens[key]) {
      dozens[key].amount += newDozens[key].amount;
    } else {
      dozens[key] = newDozens[key];
    }
    cartSection.totalDozens += newDozens[key].amount;
  });
};
