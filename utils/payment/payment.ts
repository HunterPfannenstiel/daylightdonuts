import { getDefaultCart, getInitialState } from "@_providers/cart/utils";
import { CartDictionary } from "@_types/database/cart";
import { getUserCart } from "@_utils/database/cart/queries";

/**
 *
 * @param cartId Id of the cart stored in the database
 * @returns Total price for the cart in cents (divide by 100 to get dollar amount)
 */
export const calculateOrderAmount = async (cartId: string) => {
  const cartItems = await getUserCart(cartId);
  let [initializer] = await getInitialState(cartItems);
  let cart: CartDictionary = getDefaultCart();
  initializer(cart);
  return +(cart.totalPrice * 100).toFixed(0);
};
