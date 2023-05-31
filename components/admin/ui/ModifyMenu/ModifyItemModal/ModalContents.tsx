import { FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import {
  AvailableExtraGrouping,
  AvailableGrouping,
  AvailableItemCategory,
  InitialItemSelections,
} from "@_types/admin/forms";
import useCollectModalInfo from "@_hooks/admin/menu/useCollectModalInfo";
import ItemDetails from "@_admin-reuse/ModifyMenuItem/ItemDetails";
import ItemGroupings from "@_admin-reuse/ModifyMenuItem/ItemGroupings";
import ItemExtras from "@_admin-reuse/ModifyMenuItem/ItemExtras";
import ItemCategories from "@_admin-reuse/ModifyMenuItem/ItemCategories";
import ItemAvailability from "@_admin-reuse/ModifyMenuItem/ItemAvailability";

interface ModalContentsProps {
  selections: InitialItemSelections;
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  selections,
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  const itemInfo = useCollectModalInfo(
    selections.initial_details,
    selections.initial_group_id || undefined,
    selections.initial_extra_groupings || undefined,
    selections.initial_item_categories || undefined,
    selections.initial_weekdays || undefined,
    selections.initial_range || undefined
  );

  const modifyItem = () => {};
  return (
    <form>
      <ItemDetails
        initialDetails={itemInfo.menuItemDetails}
        updateHandler={itemInfo.updateItemDetails}
      />
      <ItemGroupings
        availableGroupings={groupings}
        groupingSelectHandler={itemInfo.updateGroupingId}
        selectedId={itemInfo.selectedGroupingId}
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
    </form>
  );
};

export default ModalContents;
