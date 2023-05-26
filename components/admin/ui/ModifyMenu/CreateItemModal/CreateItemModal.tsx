import { FunctionComponent, useState } from "react";
import classes from "./CreateItemModal.module.css";
import useCollectModalInfo from "@_hooks/admin/menu/useCollectModalInfo";
import ItemDetails from "../../Reusable/ModifyMenuItem/ItemDetails";
import ItemGroupings from "../../Reusable/ModifyMenuItem/ItemGroupings";
import {
  AvailableExtraGrouping,
  AvailableItemCategory,
  AvailableGrouping,
} from "@_types/admin/forms";
import ItemExtras from "../../Reusable/ModifyMenuItem/ItemExtras";
import ItemCategories from "../../Reusable/ModifyMenuItem/ItemCategories";
import ItemAvailability from "../../Reusable/ModifyMenuItem/ItemAvailability";

interface CreateItemModalProps {
  groupings: AvailableGrouping[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: AvailableItemCategory[];
}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = ({
  groupings,
  extraGroupings,
  itemCategories,
}) => {
  const itemInfo = useCollectModalInfo();
  const [pageNum, setPageNum] = useState(0);
  const flipPage = (amount: number) => {
    setPageNum((prevState) => prevState + amount);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {pageNum === 0 && (
        <ItemDetails
          initialDetails={itemInfo.menuItemDetails}
          updateHandler={itemInfo.updateItemDetails}
        />
      )}
      {pageNum === 1 && (
        <ItemGroupings
          availableGroupings={groupings}
          groupingSelectHandler={itemInfo.updateGroupingId}
          selectedId={itemInfo.selectedGroupingId}
        />
      )}
      {pageNum === 2 && (
        <ItemExtras
          groupings={extraGroupings}
          selectedGroupings={itemInfo.selectedExtraGroupings}
          updateSelectedGroupings={itemInfo.updateExtraGroupingIds}
        />
      )}
      {pageNum === 3 && (
        <ItemCategories
          itemCategories={itemCategories}
          selectedCategories={itemInfo.selectedItemCategories}
          updateHandler={itemInfo.updateItemCategories}
        />
      )}
      {pageNum === 4 && (
        <ItemAvailability
          selectedWeekdays={itemInfo.selectedWeekdays}
          availabilityRanges={itemInfo.availabilityRanges}
          updateRangeHandler={itemInfo.updateAvailableRange}
          updateWeekdayHandler={itemInfo.updateWeekdayAvailability}
        />
      )}
      {pageNum !== 0 && (
        <button onClick={flipPage.bind(null, -1)}>{"<"}</button>
      )}
      {pageNum !== 4 && <button onClick={flipPage.bind(null, 1)}>{">"}</button>}
    </form>
  );
};
export default CreateItemModal;
