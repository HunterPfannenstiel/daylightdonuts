import { useNotification } from "@_providers/Notification/Notification";
import { useCart } from "@_providers/Cart";

const useSuccess = () => {
  const { clearCart } = useCart().cartModifiers;
  const { displayNotification } = useNotification();
  const completeOrder = () => {
    fetch("/api/cart/remove-cart");
    displayNotification("Order has been placed!", "success", 5000);
    clearCart();
  };

  return completeOrder;
};

export default useSuccess;
