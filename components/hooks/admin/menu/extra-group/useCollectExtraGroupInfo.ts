import {
  ExtraGroupExtraInfo,
  ExtraGroupSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import { useRef, useState } from "react";
import { InitialSelections } from "../modification/useSelections";

const useCollectExtraGroupInfo = (
  groupName: string,
  extras: NestedDBEntity[],
  selections?: ExtraGroupSelections
) => {
  const selectedCategoryId = useRef(selections?.initial_category_id);

  const updateSelectedCategory = (id: number) => {
    selectedCategoryId.current = id;
  };

  const selectedExtraIds = useRef(selections?.initial_extras || {});

  const selectedItemIds = useRef(selections?.initial_items || {});

  const updateSelectedItemId = (id: number) => {
    if (selectedItemIds.current[id]) {
      delete selectedItemIds.current[id];
    } else {
      selectedItemIds.current[id] = true;
    }
  };

  const [selectedExtras, setSelectedExtras] = useState(
    getSelectedExtras(
      selectedExtraIds.current,
      extras,
      selectedCategoryId.current
    )
  );

  const updateSelectedExtra = (id: number) => {
    if (!selectedExtraIds.current[id]) {
      selectedExtraIds.current[id] = true;
      setSelectedExtras((prevState) => {
        const newExtras = prevState.map((extra) => {
          return { ...extra };
        });
        newExtras.push(
          getExtrasForCategory(selectedCategoryId.current!, extras).find(
            (extra) => extra.id === id
          )!
        );
        return newExtras;
      });
    } else {
      delete selectedExtraIds.current[id];
      setSelectedExtras((prevState) => {
        const newExtras = prevState.map((extra) => {
          return { ...extra };
        });
        const index = newExtras.findIndex((extra) => extra.id === id);
        if (index !== -1) newExtras.splice(index, 1);
        return newExtras;
      });
    }
  };

  const getMenuItemIds = (selections = selectedItemIds.current) => {
    return Object.keys(selections).map((key) => {
      return +key;
    });
  };

  const getExtraDisplayOrders = (): ExtraGroupExtraInfo[] | undefined => {
    if (selectedExtras.length === 0) return undefined;
    return selectedExtras.map((extra, i) => {
      return { extraId: extra.id, displayOrder: i };
    });
  };

  const swapExtras = (indexOne: number, indexTwo: number) => {
    setSelectedExtras((prevState) => {
      const newExtras = prevState.map((extra) => {
        return { ...extra };
      });
      const temp = newExtras[indexOne];
      newExtras[indexOne] = newExtras[indexTwo];
      newExtras[indexTwo] = temp;
      return newExtras;
    });
  };

  const name = useRef(groupName);

  const updateName = (value: string) => {
    name.current = value;
  };

  return {
    name,
    updateName,
    selectedCategoryId,
    updateSelectedCategory,
    selectedExtraIds: selectedExtraIds.current,
    updateSelectedExtra,
    swapExtras,
    selectedExtras,
    selectedItemIds: selectedItemIds.current,
    updateSelectedItemId,
    getExtraDisplayOrders,
    getMenuItemIds,
  };
};

const getSelectedExtras = (
  selectedIds: InitialSelections,
  categoryExtras: NestedDBEntity[],
  categoryId?: number
) => {
  if (!categoryId) return [];
  return getExtrasForCategory(categoryId, categoryExtras).filter(
    (extra) => selectedIds[extra.id]
  );
};

const getExtrasForCategory = (
  categoryId: number,
  categoryExtras: NestedDBEntity[]
) => {
  return categoryExtras.find((cat) => cat.id === categoryId)!.entities;
};

export default useCollectExtraGroupInfo;
