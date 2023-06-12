import { InitialItemSelections } from "@_types/admin/forms";
import { useQuery } from "@tanstack/react-query";

const useItemSelections = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: fetcher.bind(null, id),
    cacheTime: 0,
  });

  return { selections: data, isLoading, isError };
};

const fetcher = async (id: number) => {
  const res = await fetch(`/api/admin/modify-menu/selections/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as InitialItemSelections;
};

export default useItemSelections;
