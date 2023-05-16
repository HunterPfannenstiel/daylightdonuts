import { getTotalingCart } from "./queries";
/**
 *
 * @param cartId Id of the cart stored in the database
 * @returns Total price for the cart in cents (divide by 100 to get dollar amount)
 */
// export const calculateOrderAmount = async (cartId: string) => {
//   const cartItems = await getUserCart(cartId);
//   let [initializer] = await getInitialState(cartItems);
//   let cart: CartDictionary = getDefaultCart();
//   initializer(cart);
//   return +(cart.totalPrice * 100).toFixed(0);
// };

/**
 * @dev Calculates the total of the cart by first totaling the grouping price and then if some items still need to be totaled,
 * the first 'x' amount of items for that group are added to the subtotal (Note: If the unit prices of items differ within a grouping, it is not deterministic if the
 * higher priced or lower priced items will be added to the subtotal if some still need to be counted for)
 * @param cartId Id of the cart to calculate the total for
 */
export const calculateCartTotal = async (cartId: number) => {
  const { cart, tax_amount } = await getTotalingCart(cartId);
  let subtotal = 0;
  let groupingDiscount = 0;
  cart.forEach((group) => {
    const { price: groupPrice, size } = group;
    let remainingToAdd = group.total_items;
    if (groupPrice && size) {
      const unitPrice = +group.items[0][0];
      const groupingCount = Math.floor(+group.total_items / size);
      const price = groupingCount * +groupPrice;
      subtotal += price;
      remainingToAdd = group.total_items - groupingCount * size;
      groupingDiscount += unitPrice * groupingCount * size - price;
    }
    if (remainingToAdd > 0) {
      let addedItems = 0;
      for (let i = 0; i < group.items.length; i++) {
        const itemAmount = group.items[i][1];
        const unitPrice = +group.items[i][0];
        const change = remainingToAdd - addedItems - itemAmount;
        if (change <= 0) {
          subtotal += (remainingToAdd - addedItems) * unitPrice;
          break;
        }
        if (change > 0) {
          subtotal += itemAmount * unitPrice;
          addedItems += itemAmount;
        }
      }
    }
  });
  subtotal = +subtotal.toFixed(2);
  const tax = +(subtotal * +tax_amount).toFixed(2);
  return { subtotal, tax, total: subtotal + tax, groupingDiscount };
};
