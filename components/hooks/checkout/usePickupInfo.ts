import { LocationDetails } from "@_types/database/checkout";
import { useQuery } from "@tanstack/react-query";

const usePickupInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pickup-info"],
    queryFn: fetchPickupInfo,
  });

  return { data, isLoading, isError };
};

export default usePickupInfo;

const fetchPickupInfo = async () => {
  const res = await fetch("/api/checkout/pickup", { cache: "force-cache" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as LocationDetails[];
};
