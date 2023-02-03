import {
  CartDictionary,
  CartDozen,
  CartDozenItem,
  CartGroup,
  CartItem,
  CartModifier,
  DozenItemUpdates,
  DozenUpdates,
  ExistingItemUpdates,
  UpdateItem,
} from "@_types/database/cart";
import { DozenBoxUpdateItem } from "@_types/dozenable";
import {
  addToDozens,
  createDozens,
  getAllItemsToGroup,
  getDozenId,
} from "../dozenbuilder";

export const initializeCart =
  (initialCart: CartDictionary): CartModifier =>
  (cart) => {
    cart.groups = initialCart.groups;
    cart.totalItems = initialCart.totalItems;
    cart.totalPrice = initialCart.totalPrice;
  };

export const addCartGroup =
  (
    groupId: string,
    groupSize: number,
    groupPrice: number,
    itemId?: string,
    item?: CartItem
  ): CartModifier =>
  (cart) => {
    cart.groups[groupId] = createInitialCartGroup(groupSize, groupPrice);
    if (itemId && item) {
      addNewItem(groupId, itemId, item)(cart);
    }
  };

export const addNewItem =
  (groupId: string, itemId: string, item: CartItem): CartModifier =>
  (cart) => {
    const group = cart.groups[groupId];
    group.items[itemId] = item;
    let updatedPrice = item.unitPrice * item.amount;
    const { amount } = item;
    if (group.groupPrice) {
      const updatePrice = makeDozens(group, group.groupPrice);
      if (updatePrice) {
        updatedPrice = updatePrice;
      }
    }

    updateCartSectionAmounts(group, updatedPrice, amount);
    updateCartAmounts(cart, updatedPrice, amount);
  };

export const updateExistingItem =
  (groupId: string, items: UpdateItem[]): CartModifier =>
  (cart) => {
    console.log(groupId);
    console.log("CART GROUPS");
    console.log(cart.groups);
    const group = cart.groups[groupId];
    let { updatedAmount, updatedPrice } = modifyExistingItems(group, items);
    updateCartSectionAmounts(group, updatedPrice, updatedAmount);
    updateCartAmounts(cart, updatedPrice, updatedAmount);
  };

export const addDozen =
  (
    groupId: string,
    dozenId: string,
    amount: number,
    dozen: CartDozenItem[]
  ): CartModifier =>
  (cart) => {
    const group = cart.groups[groupId];
    const dozenBox = group.dozens[dozenId];
    if (!dozenBox) {
      group.dozens[dozenId] = { amount, items: dozen };
    } else {
      dozenBox.amount += amount;
    }
    group.totalDozens += amount;
    const updatedPrice = group.groupPrice * amount;
    const updatedAmount = amount * group.groupSize;
    updateCartSectionAmounts(group, updatedPrice, updatedAmount);
    updateCartAmounts(cart, updatedPrice, updatedAmount);
  };

export const updateDozen =
  (groupId: string, dozenId: string, amount: number): CartModifier =>
  (cart) => {
    const group = cart.groups[groupId];
    group.dozens[dozenId].amount += amount;
    group.totalDozens += amount;
    const updatedPrice = group.groupPrice * amount;
    const updatedAmount = amount * group.groupSize;
    updateCartSectionAmounts(group, updatedPrice, updatedAmount);
    updateCartAmounts(cart, updatedPrice, updatedAmount);
  };

export const updateDozenItem =
  (groupId: string, items: UpdateItem[], dozenId: string): CartModifier =>
  (cart) => {
    const group = cart.groups[groupId];
    let updatedPrice = 0;
    let updatedAmount = 0;
    let removingFromDozen = false;
    let currDozen: UpdateItem[] = [];
    items.forEach((itemInfo) => {
      const { itemId, amount } = itemInfo;
      const item = group.items[itemId];
      updatedAmount += amount;
      updatedPrice += item.unitPrice * amount;
      if (amount > 0 || item.amount >= -amount) {
        item.amount += amount;
      } else {
        if (!removingFromDozen) {
          removingFromDozen = true;
          currDozen = getItemsFromDozen(group.dozens[dozenId]);
        }
        updateItemAmount(currDozen, amount, itemId);
      }
    });
    if (!removingFromDozen) {
      //This is needed if a 'groupSize' of donuts are added through a box, we need to compact those donuts into a box
      const newNumbers = modifyExistingItems(group, []);
      updateCartSectionAmounts(
        group,
        newNumbers.updatedPrice + updatedPrice,
        newNumbers.updatedAmount + updatedAmount
      );
      updateCartAmounts(cart, updatedPrice, updatedAmount);
    } else {
      group.totalDozens -= group.dozens[dozenId].amount;
      delete group.dozens[dozenId];
      modifyExistingItems(group, currDozen);
      updatedPrice = getNewSubTotal(group, group.groupPrice) - group.subtotal;
      updateCartSectionAmounts(group, updatedPrice, updatedAmount);
      updateCartAmounts(cart, updatedPrice, updatedAmount);
    }
  };

export const updateItemsFromCart =
  (
    existingUpdates: ExistingItemUpdates,
    dozenUpdates: DozenUpdates,
    dozenItemUpdates: DozenItemUpdates
  ): CartModifier =>
  (cart) => {
    Object.keys(existingUpdates).forEach((groupId) => {
      updateExistingItem(groupId, existingUpdates[groupId])(cart);
    });
    Object.keys(dozenUpdates).forEach((groupId) => {
      updateDozen(
        groupId,
        dozenUpdates[groupId].dozenId,
        dozenUpdates[groupId].amount
      )(cart);
    });
    Object.keys(dozenItemUpdates).forEach((groupId) => {
      Object.keys(dozenItemUpdates[groupId]).forEach((dozenId) => {
        updateDozenItem(
          groupId,
          dozenItemUpdates[groupId][dozenId],
          dozenId
        )(cart);
      });
    });
  };

export const updateCartWithBox =
  (
    groupId: string,
    groupSize: number,
    groupPrice: number,
    groupCreated: boolean,
    items: DozenBoxUpdateItem[],
    box: CartDozenItem[],
    amount: number
  ): CartModifier =>
  (cart) => {
    if (!groupCreated) {
      addCartGroup(groupId, groupSize, groupPrice)(cart);
    }
    items.forEach((item) => {
      addNewItem(groupId, item.itemId, item.item)(cart);
    });
    addDozen(groupId, getDozenId(box), amount, box)(cart);
  };

const createInitialCartGroup = (
  groupSize: number,
  groupPrice: number
): CartGroup => {
  return {
    totalItems: 0,
    subtotal: 0,
    groupSize,
    groupPrice,
    items: {},
    dozens: {},
    totalDozens: 0,
  };
};

const updateCartAmounts = (
  cart: CartDictionary,
  priceAmount: number,
  itemAmount: number
) => {
  cart.totalPrice += priceAmount;
  cart.totalItems += itemAmount;
};

const updateCartSectionAmounts = (
  cartSection: CartGroup,
  priceAmount: number,
  itemAmount: number
) => {
  cartSection.subtotal += priceAmount;
  cartSection.totalItems += itemAmount;
};

const getNewSubTotal = (cartSection: CartGroup, dozenPrice: number) => {
  let total = cartSection.totalDozens * dozenPrice;
  Object.keys(cartSection.items).forEach((key) => {
    const item = cartSection.items[key];
    total += item.amount * item.unitPrice;
  });
  return total;
};

const makeDozens = (cartSection: CartGroup, dozenPrice: number) => {
  const totalItems = countAllLooseItems(cartSection);
  const dozensToMake = Math.floor(totalItems / cartSection.groupSize);
  if (dozensToMake > 0) {
    addToDozens(
      cartSection,
      createDozens(
        cartSection.groupSize,
        totalItems,
        getAllItemsToGroup(cartSection.items)
      )
    );
    return getNewSubTotal(cartSection, dozenPrice) - cartSection.subtotal;
  }
  return 0;
};

const getItemsFromDozen = (dozen: CartDozen) => {
  const items: UpdateItem[] = [];
  dozen.items.forEach((info) => {
    items.push({ itemId: info.id, amount: info.item.amount * dozen.amount });
  });

  return items;
};

const updateItemAmount = (
  items: UpdateItem[],
  amount: number,
  itemId: string
) => {
  const item = items.find((item) => item.itemId == itemId);
  if (item) {
    item.amount += amount;
  }
};

const modifyExistingItems = (group: CartGroup, items: UpdateItem[]) => {
  console.log(group);
  let updatedPrice = 0;
  let updatedAmount = 0;
  items.forEach((item) => {
    const { itemId, amount } = item;
    updatedPrice += group.items[itemId].unitPrice * amount;
    updatedAmount += amount;
    group.items[itemId].amount += amount;
  });
  if (group.groupPrice) {
    const updatePrice = makeDozens(group, group.groupPrice);
    if (updatePrice) {
      updatedPrice = updatePrice;
    }
  }

  return { updatedPrice, updatedAmount };
};

const countAllLooseItems = (cartSection: CartGroup) => {
  let looseItems = 0;
  Object.keys(cartSection.items).forEach((key) => {
    looseItems += cartSection.items[key].amount;
  });

  return looseItems;
};
