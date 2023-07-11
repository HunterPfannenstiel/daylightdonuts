import { useNotification } from "@_providers/Notification/Notification";
import { useCart } from "@_providers/old-cart/optimistic";
import { initializeCart } from "@_utils/database/cart/modifiers/cartModifiers";

const useSuccess = () => {
  const { modifyCart } = useCart();
  const { displayNotification } = useNotification();
  const completeOrder = () => {
    fetch("/api/cart/remove-cart");
    displayNotification("Order has been placed!", "success", 5000);
    modifyCart(
      initializeCart({ groups: {}, totalItems: 0, totalPrice: 0 }),
      null,
      0
    );
  };

  return completeOrder;
};

export default useSuccess;
