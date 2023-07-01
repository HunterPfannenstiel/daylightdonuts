import {
  InitialSelections,
  SubcategorySelections,
} from "@_types/admin/modify-menu";
import { useRef, useState } from "react";

const useCollectSubcategoryInfo = (
  initialName: string,
  selections?: SubcategorySelections
) => {
  const name = useRef(initialName);

  const updateName = (newName: string) => {
    name.current = newName;
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    selections?.initial_category
  );

  const updateCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  const selectedItemIds = useRef<{ [category: number]: InitialSelections }>(
    getInitialIds(selections?.initial_items, selections?.initial_category)
  );

  const updateSelectedItem = (id: number) => {
    const categoryId = selectedCategoryId;
    if (categoryId) {
      if (selectedItemIds.current[categoryId]) {
        if (selectedItemIds.current[categoryId][id]) {
          delete selectedItemIds.current[categoryId][id];
        } else {
          selectedItemIds.current[categoryId][id] = true;
        }
      } else {
        selectedItemIds.current[categoryId] = { [id]: true };
      }
    }
  };

  const getSelectedItemIds = () => {
    if (selectedCategoryId && selectedItemIds.current) {
      return selectedItemIds.current[selectedCategoryId] || {};
    }
    return {};
  };

  return {
    name,
    selectedCategoryId,
    getSelectedItemIds,
    updateSelectedItem,
    updateCategory,
    updateName,
  };
};

export default useCollectSubcategoryInfo;

const getInitialIds = (
  ids?: InitialSelections,
  categoryId?: number
): { [category: number]: InitialSelections } => {
  if (categoryId && ids) {
    return { [categoryId]: ids };
  }
  return {};
};
