import {
  ItemDateRange,
  ItemImage,
  MenuItemDetails,
  SelectedExtraGroupings,
  SelectedItemCategories,
  SelectedWeekdays,
} from "@_types/admin/forms";
import { useRef, useState } from "react";

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

  const [itemImages, setItemImages] = useState(initialImages || []);

  const swapImages = (indexOne: number, indexTwo: number) => {
    setItemImages((prevState) => {
      const copyState = [...prevState];
      const temp = copyState[indexOne];
      copyState[indexOne] = copyState[indexTwo];
      copyState[indexTwo] = temp;
      return copyState;
    });
  };

  const addImages = (images: ItemImage[]) => {
    setItemImages((prevState) => {
      return [...prevState, ...images];
    });
  };

  const removeImage = (index: number) => {
    setItemImages((prevState) => {
      const copyState = [...prevState];
      const removedImage = copyState.splice(index, 1)[0];
      if (removedImage.blob) URL.revokeObjectURL(removedImage.imageUrl!);
      return copyState;
    });
  };

  const getImageDetails = () => {
    const newImageDisplayOrder = {} as any;
    const newImages: Blob[] = [];
    const initialImages: ItemImage[] = [];
    itemImages.forEach((image, i) => {
      if (image.blob) {
        newImageDisplayOrder[image.name!] = i;
        newImages.push(image.blob);
      } else {
        initialImages.push({ ...image, displayOrder: i });
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
    const categories = Object.keys(cats).filter((key) => !!cats[+key]);
    const subcategories: string[] = [];
    categories.forEach((id) => {
      subcategories.push(...Object.keys(cats[+id]));
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
    removeImage,
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
