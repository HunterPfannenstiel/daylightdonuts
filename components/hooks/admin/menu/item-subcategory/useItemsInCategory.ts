import { DBEntity } from "@_types/admin/modify-menu";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useItemsInCategory = (initialCategory?: number) => {
  const [categoryId, setCategoryId] = useState(initialCategory);
  const { data, isLoading, isError } = useQuery(
    [`items in category ${categoryId}`],
    {
      queryFn: fetchItemsInCategory.bind(null, categoryId),
      staleTime: Infinity,
    }
  );

  return { data, isLoading, isError, setCategoryId };
};

export default useItemsInCategory;

const fetchItemsInCategory = async (id?: number) => {
  if (!id) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/modify-menu/item-subcategory/items-in-category?id=${id}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Fetch failed", data);
  }
  return data as DBEntity[];
};
