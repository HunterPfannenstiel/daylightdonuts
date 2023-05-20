import { useNotification } from "@_providers/Notification/Notification";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSuccess = () => {
  const searchParams = useSearchParams();
  const orderStatus = searchParams?.get("orderStatus");
  const { displayNotification } = useNotification();
  useEffect(() => {
    if (orderStatus === "success") {
      displayNotification("Order has been placed!", "success", 5000);
    }
  }, [searchParams]);
};

export default useSuccess;
