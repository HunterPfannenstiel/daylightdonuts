import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import {
  AvailableExtraGrouping,
  InitialItemSelections,
  ModifyItem,
  ModifyItemDetails,
} from "@_types/admin/forms";
import useCollectModalInfo from "@_hooks/admin/menu/item/useCollectModalInfo";
import ItemDetails from "@_admin-reuse/ModifyMenuItem/ItemDetails";
import ItemGroupings from "@_admin-reuse/ModifyMenuItem/ItemGroupings";
import ItemExtras from "@_admin-reuse/ModifyMenuItem/ItemExtras";
import ItemCategories from "@_admin-reuse/ModifyMenuItem/ItemCategories";
import ItemAvailability from "@_admin-reuse/ModifyMenuItem/ItemAvailability";
import { formatDateRange } from "@_utils/admin/modify-menu";
import { createFormData } from "@_utils/index";
import ModifyMenu from "custom-objects/ModifyMenu";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";

interface ModalContentsProps {
  id: number;
  selections: InitialItemSelections;
  groupings: DBEntity[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: NestedDBEntity[];
  index: number;
  toggleModal: () => void;
  updateItem: UpdateEntity;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  id,
  selections,
  groupings,
  extraGroupings,
  itemCategories,
  index,
  toggleModal,
  updateItem,
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
    const { name, description, price, isArchived } = itemInfo.menuItemDetails;
    const {
      name: oldName,
      description: oldDesc,
      price: oldPrice,
      isArchived: oldIsArchived,
    } = selections.initial_details;

    const details: ModifyItemDetails = {
      name: ModifyMenu.CompareVal(oldName, name),
      description: ModifyMenu.CompareVal(oldDesc, description),
      price: ModifyMenu.CompareVal(oldPrice, price),
      isArchived: ModifyMenu.CompareVal(oldIsArchived, isArchived),
      groupingId: itemInfo.selectedGroupingId.current,
    };

    const selectedGroups = itemInfo.dbHelpers.getSelectedExtraGroups();
    const oldGroups = itemInfo.dbHelpers.getSelectedExtraGroups(
      selections.initial_extra_groupings || {}
    );
    const extraGroupIds = ModifyMenu.GetNewAndRemovedIds(
      oldGroups,
      selectedGroups
    );

    const { categories, subcategories } =
      itemInfo.dbHelpers.getSelectedCategories();
    const { categories: oldCat, subcategories: oldSub } =
      itemInfo.dbHelpers.getSelectedCategories(
        selections.initial_item_categories || {}
      );

    const categoryIds = ModifyMenu.GetNewAndRemovedIds(oldCat, categories);
    const subcategoryIds = ModifyMenu.GetNewAndRemovedIds(
      oldSub,
      subcategories
    );

    const weekdays = itemInfo.dbHelpers.getSelectedWeekdays();
    const oldWeekdays = itemInfo.dbHelpers.getSelectedWeekdays(
      selections.initial_weekdays || {}
    );
    const weekdayIds = ModifyMenu.GetNewAndRemovedIds(oldWeekdays, weekdays);
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
      itemDetails: JSON.stringify(details),
      addExtraGroups: JSON.stringify(extraGroupIds.newIds),
      removeExtraGroups: JSON.stringify(extraGroupIds.removedIds),
      addCategories: JSON.stringify(categoryIds.newIds),
      removeCategories: JSON.stringify(categoryIds.removedIds),
      addSubcategories: JSON.stringify(subcategoryIds.newIds),
      removeSubcategories: JSON.stringify(subcategoryIds.removedIds),
      addWeekdays: JSON.stringify(weekdayIds.newIds),
      removeWeekdays: JSON.stringify(weekdayIds.removedIds),
      removeExtraImages: JSON.stringify(removeExtraImages),
      initialImages: JSON.stringify(initialImages),
      newImageDisplayOrder: JSON.stringify(newImageDisplayOrder),
    };

    const formData = createFormData(item, { images: newImages });

    const res = await ModifyMenu.Post.Modify("item", formData, true);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (details.name) updateItem(details.name, index);
    toggleModal();
  };
  return (
    <form onSubmit={modifyItem} className={classes.form}>
      <ItemDetails
        images={itemInfo.itemImages}
        swapImages={itemInfo.swapImages}
        addImages={itemInfo.addImages}
        initialDetails={itemInfo.menuItemDetails}
        updateHandler={itemInfo.updateItemDetails}
        deleteImage={itemInfo.deleteImage}
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
