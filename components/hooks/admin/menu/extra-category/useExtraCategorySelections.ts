import { ExtraCategorySelections } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";
import ModifyMenu from "custom-objects/ModifyMenu";

const useExtraCategorySelections = (id: number) => {
  const { data } = useQuery([], {
    queryFn: fetcher.bind(null, id),
    cacheTime: 0,
  });

  return data;
};

export default useExtraCategorySelections;

const fetcher = async (id: number) => {
  return (await ModifyMenu.Get.Selections(
    "extra-category",
    id
  )) as ExtraCategorySelections;
};
