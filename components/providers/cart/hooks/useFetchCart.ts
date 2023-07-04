import { Cart, CartDBResponse } from "@_types/cart";
import { useQuery } from "@tanstack/react-query";
import APIRequest from "custom-objects/Fetch";
import { initializeCart } from "../utils";

const useFetchCart = () => {
  const queryKey = ["cart"];
  const { data, isLoading, isError } = useQuery(queryKey, {
    queryFn: getCartItems,
  });
  return {
    items: data?.items,
    status: data?.status,
    queryKey,
    isLoading,
    isError,
  };
};

export default useFetchCart;

export const getCartItems = async (): Promise<Cart> => {
  const { data, success, errorMessage } = await APIRequest.request<Cart>(
    "/api/cart"
  );
  if (!success) {
    throw new Error(errorMessage);
  }
  initializeCart(data);
  return data;
};
