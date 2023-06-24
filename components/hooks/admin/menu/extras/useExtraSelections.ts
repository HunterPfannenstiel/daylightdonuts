import { ExtraSelections } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";
import ModifyMenu from "custom-objects/ModifyMenu";

const useExtraSelections = (extraId: number) => {
  const { data, isLoading, isError } = useQuery([`extra-${extraId}`], {
    queryFn: fetchSelections.bind(null, extraId),
  });

  return { selections: data, isLoading, isError };
};

export default useExtraSelections;

const fetchSelections = async (id: number) => {
  return (await ModifyMenu.Get.Selections("extra", id)) as ExtraSelections;
};
