import { useNotification } from "@_providers/Notification/Notification";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useSuccess = () => {
  const { query } = useRouter();
  const { displayNotification } = useNotification();
  useEffect(() => {
    if (query.orderStatus === "success") {
      displayNotification("Order has been placed!", "success", 5000);
    }
  }, [query]);
};

export default useSuccess;
