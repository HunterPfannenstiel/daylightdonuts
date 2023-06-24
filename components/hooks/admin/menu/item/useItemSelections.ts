import { InitialItemSelections } from "@_types/admin/forms";
import { useQuery } from "@tanstack/react-query";
import ModifyMenu from "custom-objects/ModifyMenu";

const useItemSelections = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: fetcher.bind(null, id),
    cacheTime: 0,
  });

  return { selections: data, isLoading, isError };
};

const fetcher = async (id: number) => {
  return (await ModifyMenu.Get.Selections("item", id)) as InitialItemSelections;
};

export default useItemSelections;
