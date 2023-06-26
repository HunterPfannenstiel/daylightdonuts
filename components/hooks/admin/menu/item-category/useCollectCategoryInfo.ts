import {
  CategoryItemInfo,
  CategorySelections,
  DBEntity,
  DisplayOrderItem,
  NewCategorySubcategory,
} from "@_types/admin/modify-menu";
import { useRef, useState } from "react";

const useCollectCategoryInfo = (
  initialName: string,
  currentCategories: (DBEntity | { name: string; id: undefined })[],
  initialCategoryId?: number,
  selections?: CategorySelections
) => {
  const name = useRef(initialName);

  const currentIndex = useRef(findInitialIndex(currentCategories, initialName));

  const updateName = (newName: string) => {
    name.current = newName;

    setCategories((prevState) => {
      const copy = prevState.map((cat) => {
        return { ...cat };
      });
      copy[currentIndex.current].name = newName;
      return copy;
    });
  };

  const [categories, setCategories] = useState(
    getInitialCurrentCategories(currentCategories, initialCategoryId)
  );

  const swapCategories = (indexOne: number, indexTwo: number) => {
    setCategories((prevState) => {
      const copy = prevState.map((cat) => {
        return { ...cat };
      });
      const temp = copy[indexOne];
      copy[indexOne] = copy[indexTwo];
      copy[indexTwo] = temp;
      if (copy[indexOne].name === name.current) {
        currentIndex.current = indexOne;
      } else if (copy[indexTwo].name === name.current) {
        currentIndex.current = indexTwo;
      }
      return copy;
    });
  };

  const getCategoryDisplayOrders = () => {
    const displayOrders: DisplayOrderItem[] = [];
    categories.forEach((cat, i) => {
      if (cat?.id) displayOrders.push({ id: cat.id, displayOrder: i });
    });
    return displayOrders;
  };

  const selectedSubcategoryIds = useRef(
    selections?.initial_subcategories || {}
  );

  //   const updateSelectedSubcategory = (id: number) => {
  //     if (selectedSubcategoryIds.current[id]) {
  //       delete selectedSubcategoryIds.current[id];
  //     } else {
  //       selectedSubcategoryIds.current[id] = true;
  //     }
  //   };

  const selectedItemIds = useRef(selections?.initial_items || {});

  const updateSelectedItemId = (id: number) => {
    if (selectedItemIds.current[id]) {
      delete selectedItemIds.current[id];
    } else {
      selectedItemIds.current[id] = true;
    }
  };

  const [newSubcategories, setNewSubcategories] = useState<
    NewCategorySubcategory[]
  >([]);

  const addNewSubcategory = (name: string) => {
    setNewSubcategories((prevState) => {
      const copy = prevState.map((subCat) => {
        return { ...subCat };
      });
      copy.push({ name });
      return copy;
    });
  };

  const deleteSubcategory = (index: number) => {
    setNewSubcategories((prevState) => {
      const copy = prevState.map((subCat) => {
        return { ...subCat };
      });
      copy.splice(index, 1);
      return copy;
    });
  };

  const [itemSubcategories, setItemSubcategories] = useState<
    CategoryItemInfo[]
  >([]);

  return {
    name,
    updateName,
    categories,
    swapCategories,
    getCategoryDisplayOrders,
    selectedSubcategoryIds: selectedSubcategoryIds.current,
    selectedItemIds: selectedItemIds.current,
    updateSelectedItemId,
  };
};

const findInitialIndex = (
  categories: (DBEntity | { name: string; id: undefined })[],
  categoryName: string
) => {
  const index = categories.findIndex((cat) => cat.name === categoryName);
  if (index === -1) return categories.length;
  return index;
};

const getInitialCurrentCategories = (
  currentCategories: (DBEntity | { name: string; id: undefined })[],
  initialCategoryId?: number
) => {
  if (!initialCategoryId)
    return [...currentCategories, { name: "", id: undefined }];
  return currentCategories;
};

export default useCollectCategoryInfo;
