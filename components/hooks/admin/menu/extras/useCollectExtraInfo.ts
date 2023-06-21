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
  const extraDetails = useRef(initialDetails || details);

  const updateDetails = (key: keyof ExtraDetails, value: any) => {
    extraDetails.current[key] = value as never;
  };

  const selectedCategoryId = useRef(initialCategoryId);

  const updateCategoryId = (id: number) => {
    selectedCategoryId.current = id;
  };

  const selectedGroupingIds = useRef(initialGroups || {});

  const updateGroup = (id: number, displayOrder?: number) => {
    if (selectedGroupingIds.current[id]) {
      delete selectedGroupingIds.current[id];
    } else {
      selectedGroupingIds.current[id] = true;
    }
  };

  const getExtraGroupInfo = (
    selections = selectedGroupingIds.current
  ): ExtraGroupInfo[] => {
    return Object.keys(selections).map((key) => {
      return { extraGroupId: +key, displayOrder: null };
    });
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

const details: ExtraDetails = {
  name: "",
  price: "",
  abbreviation: "",
};
