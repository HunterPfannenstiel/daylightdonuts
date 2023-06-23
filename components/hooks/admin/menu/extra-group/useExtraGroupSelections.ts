import { ExtraGroupSelections } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";

const useExtraGroupSelections = (groupId: number) => {
  const { data, isLoading, isError } = useQuery([`extra-${groupId}`], {
    queryFn: fetcher.bind(null, groupId),
  });

  return { selections: data, isLoading, isError };
};

export default useExtraGroupSelections;

const fetcher = async (id: number) => {
  const res = await fetch(
    `/api/admin/modify-menu/extra-group/selections/${id}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as ExtraGroupSelections;
};
