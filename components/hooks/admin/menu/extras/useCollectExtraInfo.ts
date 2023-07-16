import {
  ExtraDetails,
  ExtraGroupInfo,
  InitialSelections,
} from "@_types/admin/modify-menu";
import { useRef } from "react";
import useDetails from "../useDetails";
import useSelectedId from "../useSelectedId";
import useSelections from "../useSelections";

const useCollectExtraInfo = (
  initialDetails?: ExtraDetails,
  initialCategoryId?: number,
  initialGroups?: InitialSelections
) => {
  const { details, updateDetails, getUpdatedDetails } = useDetails(
    initialDetails || getInitialDetails()
  );

  const { selectedId, updateId, getUpdatedId } =
    useSelectedId(initialCategoryId);

  const updateCategoryId = (id: number) => {
    console.log("cat id", id);
    clearSelections();
    updateId(id);
  };
  const { selections, updateSelection, clearSelections } =
    useSelections(initialGroups);
  // const selectedGroupingIds = useRef(
  //   initialCategoryId ? { [initialCategoryId]: initialGroups } : {}
  // );

  // const updateGroup = (
  //   id: number,
  //   categoryId: number,
  //   displayOrder?: number
  // ) => {
  //   if (selectedGroupingIds.current[categoryId]) {
  //     if (selectedGroupingIds.current[categoryId]![id]) {
  //       delete selectedGroupingIds.current[categoryId]![id];
  //     } else {
  //       selectedGroupingIds.current[categoryId] = { [id]: true };
  //     }
  //   } else {
  //     selectedGroupingIds.current[categoryId] = { [id]: true };
  //   }
  // };

  const getExtraGroupInfo = (
    extraSelections = selections.current
  ): ExtraGroupInfo[] => {
    if (selections) {
      return Object.keys(extraSelections).map((key) => {
        return { extraGroupId: +key, displayOrder: null };
      });
    }
    return [];
  };

  return {
    extraDetails: details.current,
    updateDetails,
    getUpdatedDetails,
    selectedCategoryId: selectedId,
    updateCategoryId,
    selectedGroupingIds: selections.current,
    updateGroup: updateSelection,
    getExtraGroupInfo,
  };
};

export default useCollectExtraInfo;

const getInitialDetails = (): ExtraDetails => {
  return {
    name: "",
    price: "",
    abbreviation: "",
  };
};
