import { ExtraSelections } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";

const useExtraSelections = (extraId: number) => {
  const { data, isLoading, isError } = useQuery([`extra-${extraId}`], {
    queryFn: fetchSelections.bind(null, extraId),
  });

  return { selections: data, isLoading, isError };
};

export default useExtraSelections;

const fetchSelections = async (id: number) => {
  const res = await fetch(`/api/admin/modify-menu/extra/selections/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("There was an error retriving initial selections");
  }
  return data as ExtraSelections;
};
