import {
  ExtraGroupExtraInfo,
  ExtraGroupSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import { useRef } from "react";
import useSelections, {
  InitialSelections,
} from "../modification/useSelections";
import useSelectedId from "../modification/useSelectedId";
import useDragDrop from "../modification/useDragDrop";

const useCollectExtraGroupInfo = (
  groupName: string,
  extras: NestedDBEntity[],
  selections?: ExtraGroupSelections
) => {
  const { selectedId: selectedCategoryId, updateId } = useSelectedId(
    selections?.initial_category_id
  );

  const [extraIds, { update: updateExtraId, delete: deleteExtraId }] =
    useSelections(selections?.initial_extras || {});

  const [itemSelections, { update: updateItem }] = useSelections(
    selections?.initial_items || {}
  );

  const [selectedExtras, { swapItems, deleteItem, addItem }] = useDragDrop(
    getSelectedExtras(extraIds, extras, selectedCategoryId.current)
  );

  const updateSelectedExtra = (id: number) => {
    if (!extraIds[id]) {
      updateExtraId(id, true);
      addItem(
        getExtrasForCategory(selectedCategoryId.current!, extras).find(
          (extra) => extra.id === id
        )!
      );
    } else {
      deleteExtraId(id);
      deleteItem(selectedExtras.findIndex((extra) => extra.id === id));
    }
  };
  const getExtraDisplayOrders = (): ExtraGroupExtraInfo[] | undefined => {
    if (selectedExtras.length === 0) return undefined;
    return selectedExtras.map((extra, i) => {
      return { extraId: extra.id, displayOrder: i };
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
    updateSelectedCategory: updateId,
    selectedExtraIds: extraIds,
    updateSelectedExtra,
    swapExtras: swapItems,
    selectedExtras,
    selectedItemIds: itemSelections,
    updateSelectedItemId: updateItem,
    getExtraDisplayOrders,
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
