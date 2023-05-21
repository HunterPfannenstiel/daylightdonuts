import { LocationDetails, OrderTimeDetails } from "@_types/database/checkout";
import { useQuery } from "@tanstack/react-query";

const usePickupInfo = (setLocationId: (locationId: number) => void) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pickup-info"],
    queryFn: fetchPickupInfo.bind(null, setLocationId),
  });

  return { data, isLoading, isError };
};

export default usePickupInfo;

const fetchPickupInfo = async (setLocationId: (locationId: number) => void) => {
  const res = await fetch("/api/checkout/pickup", { cache: "force-cache" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  setLocationId(data[0].location_id);
  return data as LocationDetails[];
};
