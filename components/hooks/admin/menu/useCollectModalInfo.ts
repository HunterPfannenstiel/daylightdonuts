import {
  ItemDateRange,
  MenuItemDetials,
  SelectedExtraGroupings,
  SelectedItemCategories,
  SelectedWeekdays,
  UpdateRangeAvailability,
} from "@_types/admin/forms";
import { useRef, useState } from "react";

const useCollectModalInfo = (
  initialDetails?: MenuItemDetials,
  initialGroupId?: number,
  initialExtraGroupings?: SelectedExtraGroupings,
  initialItemCategories?: SelectedItemCategories,
  initialWeekdays?: SelectedWeekdays,
  iniitalRanges?: ItemDateRange
) => {
  const menuItemDetails = useRef<MenuItemDetials>(
    initialDetails || initialItemDetails
  );

  const updateItemDetails = (key: keyof MenuItemDetials, value: any) => {
    menuItemDetails.current[key] = value;
  };

  const selectedGroupingId = useRef<number | undefined>(initialGroupId);

  const updateGroupingId = (id: number | undefined) => {
    selectedGroupingId.current = id;
  };

  const selectedExtraGroupings = useRef<SelectedExtraGroupings>(
    initialExtraGroupings || {}
  );

  const updateExtraGroupingIds = (key: string, value: number | undefined) => {
    selectedExtraGroupings.current[key] = value;
  };

  const [selectedItemCategories, setSelectedItemCategories] =
    useState<SelectedItemCategories>(initialItemCategories || {});

  const updateItemCategories = (ids: {
    categoryId: number;
    subcategoryId: number | undefined;
  }) => {
    const { categoryId, subcategoryId } = ids;
    setSelectedItemCategories((prevState) => {
      const copyState = { ...prevState };
      const category = copyState[categoryId];
      if (!subcategoryId) {
        //Modifying a Category
        if (category) {
          delete copyState[categoryId];
        } else copyState[categoryId] = {};
      } else {
        //Modifying a Subcategory
        if (category) {
          copyState[categoryId] = { ...prevState[categoryId] };
          const subcategory = copyState[categoryId]![subcategoryId];
          if (subcategory) {
            delete copyState[categoryId]![subcategoryId];
          } else {
            copyState[categoryId]![subcategoryId] = true;
          }
        } else {
          //Shouldn't be possible to get in here because category must be added before subcategory
          copyState[categoryId] = { [subcategoryId]: true };
        }
      }
      return copyState;
    });
  };

  const selectedWeekdays = useRef<SelectedWeekdays>(initialWeekdays || {});

  const [availabilityRange, setAvailabilityRange] = useState<
    ItemDateRange | undefined
  >(iniitalRanges);

  const updateWeekdayAvailability = (key: number) => {
    if (selectedWeekdays.current[key]) {
      delete selectedWeekdays.current[key];
    } else {
      selectedWeekdays.current[key] = true;
    }
  };

  const updateAvailableRange = (range: ItemDateRange | undefined) => {
    setAvailabilityRange(range);
  };

  return {
    menuItemDetails: menuItemDetails.current,
    updateItemDetails,
    selectedGroupingId: selectedGroupingId.current,
    updateGroupingId,
    selectedExtraGroupings: selectedExtraGroupings.current,
    updateExtraGroupingIds,
    selectedItemCategories: selectedItemCategories,
    updateItemCategories,
    selectedWeekdays: selectedWeekdays.current,
    updateWeekdayAvailability,
    availabilityRange,
    updateAvailableRange,
  };
};

export default useCollectModalInfo;

const initialItemDetails: MenuItemDetials = {
  image: { url: "" },
  name: "",
  price: "",
  description: "",
};
