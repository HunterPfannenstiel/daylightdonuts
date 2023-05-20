import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@_types/database/menu";

const useMenu = () => {
  const params = useSearchParams();
  const category = params?.get("category") || undefined;
  const filter = params?.get("filter") || undefined;
  const { data, isLoading } = useQuery(["menu", category, filter], async () => {
    console.log("fetching");
    let response: Response;
    if (category === "Dozenable") {
      response = await fetch("/api/menu/dozenable");
    } else {
      response = await fetch(
        `/api/menu/filter?category=${category}&filter=${filter}`
      );
    }
    const data = await response.json();
    return data as MenuItem[];
  });

  return [data as MenuItem[] | undefined, isLoading, { category, filter }] as [
    MenuItem[] | undefined,
    boolean,
    { category: string | undefined; filter: string | undefined }
  ];
};

export default useMenu;
