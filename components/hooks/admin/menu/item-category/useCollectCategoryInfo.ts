import {
  CategoryItemInfo,
  CategoryItems,
  CategorySelections,
  DBEntity,
  DisplayOrderItem,
  NewCategorySubcategory,
} from "@_types/admin/modify-menu";
import ModifyMenu from "custom-objects/ModifyMenu";
import { useRef, useState } from "react";

const useCollectCategoryInfo = (
  initialName: string,
  currentCategories: (DBEntity | { name: string; id: undefined })[] = [],
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

  const [itemSelections, setItemSelections] = useState(
    selections?.initial_items || {}
  );

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

  const deleteNewSubcategory = (index: number) => {
    setNewSubcategories((prevState) => {
      const copy = prevState.map((subCat) => {
        return { ...subCat };
      });
      copy.splice(index, 1);
      return copy;
    });
  };

  const [subcategoryItems, setSubcategoryItems] = useState(
    selections?.subcategory_items || {}
  );

  const addItemToSubcategory = (subCategory: string, id: number) => {
    setSubcategoryItems((prevState) => {
      const copy = { ...prevState };
      if (!copy[subCategory]) {
        copy[subCategory] = [id];
      } else {
        if (!copy[subCategory].includes(id)) {
          const copyIds = [...copy[subCategory]];
          copyIds.push(id);
          copy[subCategory] = copyIds;
        }
      }
      return copy;
    });
  };

  const removeItemFromSubcategory = (subCategory: string, index: number) => {
    setSubcategoryItems((prevState) => {
      const copy = { ...prevState };
      const copyIds = [...copy[subCategory]];
      copyIds.splice(index, 1);
      copy[subCategory] = copyIds;
      return copy;
    });
  };

  const [currentSubcategories, setCurrentSubcategories] = useState(
    selections?.initial_subcategories || []
  );

  const getRemovedSubcategoryIds = () => {
    if (!selections?.initial_subcategories) {
      return ModifyMenu.CheckArrayLen(currentSubcategories);
    }
    return ModifyMenu.GetRemovedIds(
      selections.initial_subcategories.map((entity) => entity.id),
      currentSubcategories.map((entity) => entity.id)
    );
  };

  const deleteCurrentSubcategory = (index: number) => {
    setCurrentSubcategories((prevState) => {
      const copy = [...prevState];
      copy.splice(index, 1);
      return copy;
    });
  };

  const [categoryItemIds, setCategoryItemIds] = useState(
    initialItemsToItemIds(selections?.initial_items)
  );

  const updateCategoryItem = (itemId: number, name?: string) => {
    setCategoryItemIds((prevState) => {
      const copy = [...prevState];
      if (!name) {
        copy.splice(
          copy.findIndex((id) => id === itemId),
          1
        );
      } else {
        copy.push(itemId);

        setItemSelections((prevState) => {
          const copy = { ...prevState };
          copy[itemId] = name;
          return copy;
        });
      }

      return copy;
    });

    if (!name) {
      setSubcategoryItems((prevState) => {
        const copy = { ...prevState };
        Object.keys(copy).forEach((key) => {
          const index = copy[key].findIndex((id) => id === itemId);
          if (index !== -1) {
            const copyIds = [...copy[key]];
            copyIds.splice(index, 1);
            copy[key] = copyIds;
          }
        });
        return copy;
      });
      setItemSelections((prevState) => {
        const copy = { ...prevState };
        delete copy[itemId];
        return copy;
      });
    }
  };

  const getCategoryItemInfo = () => {
    const removeInfo: CategoryItemInfo[] = [];
    const addInfo: CategoryItemInfo[] = [];
    if (selections?.subcategory_items) {
      Object.keys(subcategoryItems).forEach((key) => {
        const items = subcategoryItems[key] || [];
        const initialItems = selections?.subcategory_items[key] || [];
        console.log(key);
        console.log({ items, initialItems });

        const { newIds, removedIds } = ModifyMenu.GetNewAndRemovedIds(
          initialItems,
          items
        );
        newIds?.forEach((id) => {
          addInfo.push({ subcategory: key, itemId: id });
        });
        removedIds?.forEach((id) => {
          removeInfo.push({ subcategory: key, itemId: id });
        });
      });
    } else {
      Object.keys(subcategoryItems).forEach((key) => {
        subcategoryItems[key].forEach((id) => {
          addInfo.push({ subcategory: key, itemId: id });
        });
      });
    }
    return {
      addInfo: ModifyMenu.CheckArrayLen(addInfo),
      removeInfo: ModifyMenu.CheckArrayLen(removeInfo),
    };
  };

  return {
    name,
    updateName,
    categories,
    swapCategories,
    getCategoryDisplayOrders,
    newSubcategories,
    addNewSubcategory,
    deleteNewSubcategory,
    subcategoryItems,
    addItemToSubcategory,
    removeItemFromSubcategory,
    currentSubcategories,
    deleteCurrentSubcategory,
    categoryItemIds,
    updateCategoryItem,
    itemSelections,
    categoryDisplayOrder: currentIndex,
    getCategoryItemInfo,
    getRemovedSubcategoryIds,
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

const initialItemsToItemIds = (items?: CategoryItems) => {
  if (!items) return [];
  return Object.keys(items).map((id) => +id);
};

export default useCollectCategoryInfo;
