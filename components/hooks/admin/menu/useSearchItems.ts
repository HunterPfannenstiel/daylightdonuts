import { DBEntity } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";

const useSearchItems = () => {
  const { data } = useQuery(["db-items"], {
    queryFn: fetcher,
    initialData: [],
  });
  return { data };
};

export default useSearchItems;
const fetcher = async () => {
  const res = await fetch("/api/admin/search-items");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("EEE");
  }
  return data as DBEntity[];
};
