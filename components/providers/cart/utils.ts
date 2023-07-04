import {
  Cart,
  CartItem,
  CartItemExtra,
  CartSectionDetails,
} from "@_types/cart";

export const initializeCart = (cart: Cart) => {
  let totalItems = 0;
  let totalPrice = 0;
  let nextId = 0;
  const itemIds = Object.keys(cart.items);
  itemIds.forEach((itemId) => {
    const itemSection = cart.items[+itemId];
    const cartItemIds = Object.keys(itemSection);
    cartItemIds.forEach((cartItemId) => {
      const item = cart.items[+itemId].items[+cartItemId];
      const extraPrice = calculateExtraPrice(item);
      if (extraPrice) item.extraPrice = extraPrice;
      totalItems += item.amount;
      totalPrice += +itemSection.details.price + extraPrice;
      nextId = Math.max(nextId, +cartItemId);
    });
  });
  cart.price = totalPrice.toFixed(2);
  cart.totalItems = totalItems;
  cart.nextId = nextId;
};

export const addNewItemAndSection =
  (itemId: number, item: CartItem, details: CartSectionDetails) =>
  (cart: Cart) => {
    cart.items[itemId] = {
      items: { [cart.nextId]: item },
      details,
    };
    const extraPrice = calculateExtraPrice(item);
    if (extraPrice) item.extraPrice = extraPrice;
    cart.price = (
      +cart.price +
      (+details.price + extraPrice) * item.amount
    ).toFixed(2);
    cart.totalItems += item.amount;
  };

export const addNewItem = (itemId: number, item: CartItem) => (cart: Cart) => {
  const { details, items } = cart.items[itemId];
  items[cart.nextId] = item;
  const extraPrice = calculateExtraPrice(item);
  if (extraPrice) item.extraPrice = extraPrice;
  cart.price = (
    +cart.price +
    (+details.price + extraPrice) * item.amount
  ).toFixed(2);
  cart.totalItems += item.amount;
};

export const updateExistingItem =
  (itemId: number, cartItemId: number, amount: number) => (cart: Cart) => {
    const { details, items } = cart.items[itemId];
    const item = items[cartItemId];
    const itemPrice = +details.price + item?.extraPrice! || 0;
    if (item.amount < 1) {
      delete cart.items[itemId].items[cartItemId];
    }
    cart.totalItems += amount;
    cart.price = (+cart.price + itemPrice * amount).toFixed(2);
  };

export const removeItem =
  (itemId: number, cartItemId: number) => (cart: Cart) => {
    const { details, items } = cart.items[itemId];
    const item = items[cartItemId];
    cart.price = (
      +cart.price -
      (+details.price + item?.extraPrice! || 0) * item.amount
    ).toString(2);
    cart.totalItems -= item.amount;
    delete cart.items[itemId].items[cartItemId];
  };

const calculateExtraPrice = (item: CartItem) => {
  let itemPrice = 0;
  if (item.extras) {
    item.extras.forEach((extra) => {
      itemPrice += extra.price || 0;
    });
  }
  return itemPrice;
};

const checkIfExists = (
  itemId: number,
  cart: Cart,
  extras?: CartItemExtra[]
) => {
  const section = cart.items[itemId];
  if (!section) return -1;
  const sectionKeys = Object.keys(section);
  for (let i = 0; i < sectionKeys.length; i++) {
    const cartItemId = +sectionKeys[i];
    const item = section.items[cartItemId];
    if (item.extras) {
      if (!extras) continue;
      if (item.extras.length !== extras.length) continue;
      for (let i = 0; i < item.extras.length; i++) {
        const extra = item.extras[i];
        const newItemExtra = extras[i];
        if (
          newItemExtra.category !== extra.category ||
          newItemExtra.name !== extra.name
        )
          break;
      }
      return cartItemId;
    } else if (!extras) return cartItemId;
  }
  return -1;
};
