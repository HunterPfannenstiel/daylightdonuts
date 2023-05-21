import { LocationDetails, OrderTimeDetails } from "@_types/database/checkout";
import { useQuery } from "@tanstack/react-query";

const usePickupInfo = (orderTimeDetails: OrderTimeDetails) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pickup-info"],
    queryFn: fetchPickupInfo.bind(null, orderTimeDetails),
  });

  return { data, isLoading, isError };
};

export default usePickupInfo;

const fetchPickupInfo = async (orderTimeDetails: OrderTimeDetails) => {
  const res = await fetch("/api/checkout/pickup", { cache: "force-cache" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  orderTimeDetails["locationId"] = data[0].location_id;
  return data as LocationDetails[];
};
