import { useNotification } from "@_providers/Notification/Notification";
import { useCart } from "@_providers/Cart";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSuccess = () => {
  const { clearCart } = useCart().cartModifiers;
  const { displayNotification } = useNotification();
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    if (params && params.get("orderStatus") === "success") {
      completeOrder();
    }
  }, [params]);
  const completeOrder = () => {
    fetch("/api/cart/remove-cart");
    displayNotification("Order has been placed!", "success", 5000);
    clearCart();
    router.replace("/");
  };

  return completeOrder;
};

export default useSuccess;
