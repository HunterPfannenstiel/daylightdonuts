import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
  InitialItemSelections,
  ItemDateRange,
  MenuItemDetails,
  ModifyItem,
  ModifyItemDetails,
} from "@_types/admin/forms";
import useCollectModalInfo from "@_hooks/admin/menu/useCollectModalInfo";
import ItemDetails from "@_admin-reuse/ModifyMenuItem/ItemDetails";
import ItemGroupings from "@_admin-reuse/ModifyMenuItem/ItemGroupings";
import ItemExtras from "@_admin-reuse/ModifyMenuItem/ItemExtras";
import ItemCategories from "@_admin-reuse/ModifyMenuItem/ItemCategories";
import ItemAvailability from "@_admin-reuse/ModifyMenuItem/ItemAvailability";
import { formatDateRange } from "@_utils/admin/modify-menu";
import { createFormData } from "@_utils/index";

interface ModalContentsProps {
  id: number;
  selections: InitialItemSelections;
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  id,
  selections,
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  const itemInfo = useCollectModalInfo(
    { ...selections.initial_details },
    selections.initial_group_id || undefined,
    selections.initial_extra_groupings || undefined,
    selections.initial_item_categories || undefined,
    selections.initial_weekdays || undefined,
    selections.initial_range || undefined,
    selections.initial_images
  );

  const modifyItem = async (e: FormEvent) => {
    e.preventDefault();
    const itemDetails = getItemDetails(
      itemInfo.menuItemDetails,
      selections.initial_details,
      itemInfo.availabilityRange,
      selections.initial_range || undefined,
      itemInfo.selectedGroupingId.current,
      selections.initial_group_id || undefined
    );
    const selectedGroup = itemInfo.dbHelpers.getSelectedExtraGroups();
    const oldGroups = itemInfo.dbHelpers.getSelectedExtraGroups(
      selections.initial_extra_groupings || {}
    );

    let addExtraGroups = selectedGroup.filter(
      (id) => !oldGroups.includes(id)
    ) as number[] | undefined;
    let removeExtraGroups = oldGroups.filter(
      (id) => !selectedGroup.includes(id)
    ) as number[] | undefined;

    addExtraGroups = addExtraGroups!.length > 0 ? addExtraGroups : undefined;
    removeExtraGroups =
      removeExtraGroups!.length > 0 ? removeExtraGroups : undefined;
    const { categories, subcategories } =
      itemInfo.dbHelpers.getSelectedCategories();
    const { categories: oldCat, subcategories: oldSub } =
      itemInfo.dbHelpers.getSelectedCategories(
        selections.initial_item_categories || {}
      );

    let addCategories = categories.filter((id) => !oldCat.includes(id)) as
      | string[]
      | undefined;
    let removeCategories = oldCat.filter((id) => !categories.includes(id)) as
      | string[]
      | undefined;

    addCategories = addCategories!.length > 0 ? addCategories : undefined;
    removeCategories =
      removeCategories!.length > 0 ? removeCategories : undefined;

    let addSubcategories = subcategories.filter(
      (id) => !oldSub.includes(id)
    ) as string[] | undefined;
    let removeSubcategories = oldSub.filter(
      (id) => !subcategories.includes(id)
    ) as string[] | undefined;

    addSubcategories =
      addSubcategories!.length > 0 ? addSubcategories : undefined;
    removeSubcategories =
      removeSubcategories!.length > 0 ? removeSubcategories : undefined;

    const weekdays = itemInfo.dbHelpers.getSelectedWeekdays();
    const oldWeekdays = itemInfo.dbHelpers.getSelectedWeekdays(
      selections.initial_weekdays || {}
    );
    let addWeekdays = weekdays.filter((id) => !oldWeekdays.includes(id)) as
      | string[]
      | undefined;
    let removeWeekdays = oldWeekdays.filter((id) => !weekdays.includes(id)) as
      | string[]
      | undefined;

    addWeekdays = addWeekdays!.length > 0 ? addWeekdays : undefined;
    removeWeekdays = removeWeekdays!.length > 0 ? removeWeekdays : undefined;
    const { newImageDisplayOrder, newImages, initialImages } =
      itemInfo.dbHelpers.getImageDetails();
    let removeExtraImages = selections.initial_images
      .filter((image) => {
        for (let i = 0; i < initialImages.length; i++) {
          if (initialImages[i].imageId === image.imageId) return false;
        }
        return true;
      })
      .map((image) => image.imageId!) as number[] | undefined;
    removeExtraImages =
      removeExtraImages!.length > 0 ? removeExtraImages : undefined;
    const item: ModifyItem = {
      itemId: id,
      itemDetails: JSON.stringify(itemDetails),
      addExtraGroups: JSON.stringify(addExtraGroups),
      removeExtraGroups: JSON.stringify(removeExtraGroups),
      addCategories: JSON.stringify(addCategories),
      removeCategories: JSON.stringify(removeCategories),
      addSubcategories: JSON.stringify(addSubcategories),
      removeSubcategories: JSON.stringify(removeSubcategories),
      addWeekdays: JSON.stringify(addWeekdays),
      removeWeekdays: JSON.stringify(removeWeekdays),
      removeExtraImages: JSON.stringify(removeExtraImages),
      initialImages: JSON.stringify(initialImages),
      newImageDisplayOrder: JSON.stringify(newImageDisplayOrder),
    };

    const formData = createFormData(item, { images: newImages });

    const res = await fetch("/api/admin/modify-menu/modify-item", {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      console.error(data);
    }
  };
  return (
    <form onSubmit={modifyItem}>
      <ItemDetails
        images={itemInfo.itemImages}
        swapImages={itemInfo.swapImages}
        addImages={itemInfo.addImages}
        initialDetails={itemInfo.menuItemDetails}
        updateHandler={itemInfo.updateItemDetails}
      />
      <ItemGroupings
        availableGroupings={groupings}
        groupingSelectHandler={itemInfo.updateGroupingId}
        selectedId={itemInfo.selectedGroupingId.current}
      />
      <ItemExtras
        groupings={extraGroupings}
        selectedGroupings={itemInfo.selectedExtraGroupings}
        updateSelectedGroupings={itemInfo.updateExtraGroupingIds}
      />
      <ItemCategories
        itemCategories={itemCategories}
        selectedCategories={itemInfo.selectedItemCategories}
        updateHandler={itemInfo.updateItemCategories}
      />
      <ItemAvailability
        selectedWeekdays={itemInfo.selectedWeekdays}
        availabilityRange={itemInfo.availabilityRange}
        updateRangeHandler={itemInfo.updateAvailableRange}
        updateWeekdayHandler={itemInfo.updateWeekdayAvailability}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default ModalContents;

const getItemDetails = (
  newInfo: MenuItemDetails,
  oldInfo: MenuItemDetails,
  newRange?: ItemDateRange,
  oldRange?: ItemDateRange,
  newGroupingId?: number,
  oldGroupingId?: number
) => {
  console.log("old", oldGroupingId);
  console.log("new", newGroupingId);
  const {
    name: newName,
    description: newDesc,
    price: newPrice,
    isActive: newActive,
    isArchived: newArchive,
  } = newInfo;
  const {
    name: oldName,
    description: oldDesc,
    price: oldPrice,
    isActive: oldActive,
    isArchived: oldArchive,
  } = oldInfo;
  let containsUpdates = false;
  const item = {} as ModifyItemDetails;
  if (newName !== oldName) {
    item["name"] = newName;
    containsUpdates = true;
  }
  if (newDesc !== oldDesc) {
    item["description"] = newDesc;
    containsUpdates = true;
  }
  if (newPrice !== oldPrice) {
    item["price"] = newPrice;
    containsUpdates = true;
  }
  if (newActive !== oldActive) {
    item["isActive"] = newActive;
    containsUpdates = true;
  }
  if (newArchive !== oldArchive) {
    item["isArchived"] = newArchive;
    containsUpdates = true;
  }
  const newDRange = formatDateRange(newRange);
  const oldDRange = formatDateRange(oldRange);
  if (newDRange !== oldDRange) {
    item["availabilityRange"] = newDRange || null;
    containsUpdates = true;
  }
  if (newGroupingId !== oldGroupingId) {
    containsUpdates = true;
  }
  item["groupingId"] = newGroupingId || null;
  if (containsUpdates) return item;
  else return undefined;
};
