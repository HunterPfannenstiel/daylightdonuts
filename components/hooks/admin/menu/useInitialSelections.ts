import { useQuery } from "@tanstack/react-query";
import ModifyMenu from "custom-objects/ModifyMenu";

const useInitialSelections = <T>(id: number, menuSection: string) => {
  const { data, isLoading, isError } = useQuery([`${menuSection}-${id}`], {
    queryFn: fetchSelections.bind(null, id, menuSection),
    cacheTime: 0,
  });

  return { selections: data as T, isLoading, isError };
};

export default useInitialSelections;

const fetchSelections = async (id: number, menuSection: string) => {
  return (await ModifyMenu.Get.Selections(menuSection, id)) as any;
};
