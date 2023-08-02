import {
  ItemDateRange,
  ItemImage,
  MenuItemDetails,
  SelectedExtraGroupings,
  SelectedItemCategories,
  SelectedWeekdays,
} from "@_types/admin/forms";
import { useRef, useState } from "react";
import useDragDrop from "../modification/useDragDrop";

const useCollectModalInfo = (
  initialDetails?: MenuItemDetails,
  initialGroupId?: number,
  initialExtraGroupings?: SelectedExtraGroupings,
  initialItemCategories?: SelectedItemCategories,
  initialWeekdays?: SelectedWeekdays,
  iniitalRanges?: ItemDateRange,
  initialImages?: ItemImage[]
) => {
  const menuItemDetails = useRef<MenuItemDetails>(
    initialDetails || initialItemDetails
  );

  const updateItemDetails = (key: keyof MenuItemDetails, value: any) => {
    menuItemDetails.current[key] = value as never;
  };

  const [
    itemImages,
    { swapItems: swapImages, addManyItems: addImages, deleteItem: deleteImage },
  ] = useDragDrop(initialImages);

  const getImageDetails = () => {
    const newImageDisplayOrder = {} as any;
    const newImages: Blob[] = [];
    const initialImages: { imageId: number; displayOrder: number }[] = [];
    itemImages.forEach((image, i) => {
      if (image.blob) {
        newImageDisplayOrder[image.name!] = i;
        newImages.push(image.blob);
      } else {
        initialImages.push({ imageId: image.imageId!, displayOrder: i });
      }
    });
    return { newImageDisplayOrder, newImages, initialImages };
  };

  const selectedGroupingId = useRef<number | undefined>(initialGroupId);

  const updateGroupingId = (id: number | undefined) => {
    selectedGroupingId.current = id;
  };

  const selectedExtraGroupings = useRef<SelectedExtraGroupings>(
    { ...initialExtraGroupings } || {}
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
        if (category || category === null) {
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

  const selectedWeekdays = useRef<SelectedWeekdays>(
    { ...initialWeekdays } || {}
  );

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

  const getSelectedExtraGroups = (
    groupings = selectedExtraGroupings.current
  ) => {
    return Object.values(groupings).filter((id) => !!id) as number[];
  };

  const getSelectedCategories = (cats = selectedItemCategories) => {
    const categories = Object.keys(cats).filter(
      (key) => !!cats[+key] || cats[+key] === null
    );
    const subcategories: string[] = [];
    categories.forEach((id) => {
      const subcats = cats[+id];
      if (subcats) subcategories.push(...Object.keys(subcats));
    });

    return { categories, subcategories };
  };
  const getSelectedWeekdays = (weekdays = selectedWeekdays.current) => {
    return Object.keys(weekdays);
  };
  return {
    menuItemDetails: menuItemDetails.current,
    updateItemDetails,
    selectedGroupingId: selectedGroupingId,
    updateGroupingId,
    selectedExtraGroupings: selectedExtraGroupings.current,
    updateExtraGroupingIds,
    selectedItemCategories: selectedItemCategories,
    updateItemCategories,
    selectedWeekdays: selectedWeekdays.current,
    updateWeekdayAvailability,
    availabilityRange,
    updateAvailableRange,
    itemImages,
    swapImages,
    addImages,
    deleteImage,
    dbHelpers: {
      getSelectedExtraGroups,
      getSelectedCategories,
      getSelectedWeekdays,
      getImageDetails,
    },
  };
};

export default useCollectModalInfo;

const initialItemDetails: MenuItemDetails = {
  name: "",
  price: "",
  description: "",
  isActive: true,
  isArchived: false,
};
