import {
  ExtraDetails,
  ExtraGroupInfo,
  InitialSelections,
} from "@_types/admin/modify-menu";
import { useRef } from "react";

const useCollectExtraInfo = (
  initialDetails?: ExtraDetails,
  initialCategoryId?: number,
  initialGroups?: InitialSelections
) => {
  const extraDetails = useRef(initialDetails || details());

  const updateDetails = (key: keyof ExtraDetails, value: any) => {
    extraDetails.current[key] = value as never;
  };

  const selectedCategoryId = useRef(initialCategoryId);

  const updateCategoryId = (id: number) => {
    selectedCategoryId.current = id;
  };

  const selectedGroupingIds = useRef(
    initialCategoryId ? { [initialCategoryId]: initialGroups } : {}
  );

  const updateGroup = (
    id: number,
    categoryId: number,
    displayOrder?: number
  ) => {
    if (selectedGroupingIds.current[categoryId]) {
      if (selectedGroupingIds.current[categoryId]![id]) {
        delete selectedGroupingIds.current[categoryId]![id];
      } else {
        selectedGroupingIds.current[categoryId] = { [id]: true };
      }
    } else {
      selectedGroupingIds.current[categoryId] = { [id]: true };
    }
  };

  const getExtraGroupInfo = (
    selections = selectedGroupingIds.current[selectedCategoryId.current || 0]
  ): ExtraGroupInfo[] => {
    if (selections) {
      return Object.keys(selections).map((key) => {
        return { extraGroupId: +key, displayOrder: null };
      });
    }
    return [];
  };

  return {
    extraDetails: extraDetails.current,
    updateDetails,
    selectedCategoryId,
    updateCategoryId,
    selectedGroupingIds: selectedGroupingIds.current,
    updateGroup,
    getExtraGroupInfo,
  };
};

export default useCollectExtraInfo;

const details = (): ExtraDetails => {
  return {
    name: "",
    price: "",
    abbreviation: "",
  };
};
