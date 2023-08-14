import { SubcategorySelections } from "@_types/admin/modify-menu";
import { useRef, useState } from "react";
import useNestedSelections, {
  NestedSelections,
} from "../modification/useNestedSelections";
import { InitialSelections } from "../modification/useSelections";

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

  const [selectedItemIds, updateSelection] = useNestedSelections(
    getInitialIds(selections?.initial_items, selections?.initial_category)
  );

  const updateSelectedItem = (id: number, value?: boolean) => {
    const categoryId = selectedCategoryId;
    if (categoryId) {
      updateSelection(categoryId, id, value);
    }
  };

  const getSelectedItemIds = () => {
    if (selectedCategoryId !== undefined) {
      return selectedItemIds[selectedCategoryId] || {};
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
): NestedSelections => {
  if (categoryId && ids) {
    return { [categoryId]: ids };
  }
  return {};
};
