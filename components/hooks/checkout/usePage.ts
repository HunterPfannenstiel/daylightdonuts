import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const usePage = (animationTime: number) => {
  const searchParams = useSearchParams();
  const page = searchParams?.get("page");
  const orderStatus = searchParams?.get("orderStatus");
  const [renderOrder, setRenderOrder] = useState(
    !page || page === "Your Order"
  );
  const [playAnimation, setPlayAnimation] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!renderOrder && (!page || page === "Your Order")) {
      timer = setTimeout(() => {
        setRenderOrder(true);
        setPlayAnimation(false);
      }, animationTime);
      setPlayAnimation(true);
    } else if (renderOrder && page === "Payment") {
      timer = setTimeout(() => {
        setRenderOrder(false);
        setPlayAnimation(false);
      }, animationTime);
      setPlayAnimation(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [page]);

  useEffect(() => {
    if (orderStatus) {
      fetch("/api/cart/remove-cart");
    }
  }, [orderStatus]);

  return {
    renderOrder,
    playAnimation,
  };
};

export default usePage;
