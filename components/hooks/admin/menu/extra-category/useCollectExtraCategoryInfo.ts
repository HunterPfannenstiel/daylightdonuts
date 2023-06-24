import {
  ExtraCategoryItem,
  ExtraCategorySelections,
  InitialSelections,
  NewExtraCategoryExtra,
} from "@_types/admin/modify-menu";
import { useRef, useState } from "react";

const useCollectExtraCategoryInfo = (
  name: string,
  initialInfo?: ExtraCategorySelections
) => {
  const selectedItemIds = useRef(getInitialItemIds(initialInfo?.initial_items));

  const [selectedItems, setSelectedItems] = useState<CategoryDetailedItem[]>(
    getInitialDetailedItems(initialInfo?.initial_items)
  );

  const [newExtras, setNewExtras] = useState<NewExtraCategoryExtra[]>([]);
};

type CategoryDetailedItem = { id: number; name: string; category: string };

const getInitialItemIds = (items?: ExtraCategoryItem) => {
  if (!items) return {};
  const selections: InitialSelections = {};
  Object.keys(items).map((key) => {
    selections[+key] = true;
  });
  return selections;
};

const getInitialDetailedItems = (
  items?: ExtraCategoryItem
): CategoryDetailedItem[] => {
  if (!items) return [];
  return Object.keys(items).map((key) => {
    return { id: +key, ...items[+key] };
  });
};

export default useCollectExtraCategoryInfo;
