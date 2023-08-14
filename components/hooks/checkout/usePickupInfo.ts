import { LocationDetails } from "@_types/database/checkout";
import { useQuery } from "@tanstack/react-query";
import APIRequest from "custom-objects/Fetch";

const usePickupInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pickup-info"],
    queryFn: fetchPickupInfo,
  });

  return { data, isLoading, isError };
};

export default usePickupInfo;

const fetchPickupInfo = async () => {
  const { data, errorMessage, success } = await APIRequest.request<
    LocationDetails[]
  >("/api/checkout/pickup");
  if (!success) {
    throw new Error(errorMessage);
  }

  return data;
};
