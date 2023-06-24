import { ExtraGroupSelections } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";
import ModifyMenu from "custom-objects/ModifyMenu";

const useExtraGroupSelections = (groupId: number) => {
  const { data, isLoading, isError } = useQuery([`extra-${groupId}`], {
    queryFn: fetcher.bind(null, groupId),
  });

  return { selections: data, isLoading, isError };
};

export default useExtraGroupSelections;

const fetcher = async (id: number) => {
  return (await ModifyMenu.Get.Selections(
    "extra-group",
    id
  )) as ExtraGroupSelections;
};
