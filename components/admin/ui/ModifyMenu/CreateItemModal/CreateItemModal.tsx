import { FormEvent, FunctionComponent, useState } from "react";
import classes from "./CreateItemModal.module.css";
import useCollectModalInfo from "@_hooks/admin/menu/useCollectModalInfo";
import ItemDetails from "../../Reusable/ModifyMenuItem/ItemDetails";
import ItemGroupings from "../../Reusable/ModifyMenuItem/ItemGroupings";
import {
  AvailableExtraGrouping,
  AvailableItemCategory,
  AvailableGrouping,
  NewDBItem,
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

  const createItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, price, image, description } = itemInfo.menuItemDetails;
    const groupingId = itemInfo.selectedGroupingId;
    const { selectedExtraGroupings } = itemInfo;
    const extraGroups = Object.values(selectedExtraGroupings).filter(
      (id) => !!id
    ) as number[];
    const { selectedItemCategories } = itemInfo;
    const categories = Object.keys(selectedItemCategories).filter(
      (key) => !!selectedItemCategories[+key]
    );
    const subcategories: string[] = [];
    categories.forEach((id) => {
      subcategories.push(...Object.keys(selectedItemCategories[+id]));
    });
    const { selectedWeekdays } = itemInfo;
    const availableWeekdays = Object.keys(selectedWeekdays);
    const { availabilityRanges } = itemInfo;
    let availableRanges = availabilityRanges.map((range) => {
      if (range.isNewRange) {
        return `[${range.range.from?.toISOString()}-${range.range.to?.toISOString()}]`;
      }
    }) as string[];
    availableRanges = availableRanges.filter((range) => !!range);

    const item: NewDBItem = {
      name,
      price: +(+price).toFixed(2),
      image,
      description,
      groupingId: groupingId || null,
      extraGroups: extraGroups.length > 0 ? extraGroups : null,
      categories: categories.length > 0 ? categories : null,
      subcategories: subcategories.length > 0 ? subcategories : null,
      availableWeekdays:
        availableWeekdays.length > 0 ? availableWeekdays : null,
      availableRanges: availableRanges.length > 0 ? availableRanges : null,
    };
  };

  return (
    <form onSubmit={createItem}>
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
