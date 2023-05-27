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
import { createFormData } from "@_utils/index";

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

  const createItem = async (e: FormEvent<HTMLFormElement>) => {
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
    const { availabilityRange } = itemInfo;
    const dataValues = {
      name,
      price: +(+price).toFixed(2),
      description,
      groupingId,
      extraGroups: JSON.stringify(extraGroups),
      categories: JSON.stringify(categories),
      subcategories: JSON.stringify(subcategories),
      availableWeekdays: JSON.stringify(availableWeekdays),
      availabilityRange,
    };
    // const arrayValues = {
    //   images: [image.blob!],
    //   extraGroups,
    //   categories,
    //   subcategories,
    //   availableWeekdays,
    // };
    const formData = createFormData(dataValues, { images: [image.blob!] });
    const res = await fetch("/api/admin/modify-menu/modify-item", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    }
    console.log("New item id", data.itemId);
  };

  return (
    <form onSubmit={createItem} className={classes.form}>
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
          availabilityRange={itemInfo.availabilityRange}
          updateRangeHandler={itemInfo.updateAvailableRange}
          updateWeekdayHandler={itemInfo.updateWeekdayAvailability}
        />
      )}
      <div className={classes.buttons}>
        <button
          type="button"
          onClick={flipPage.bind(null, -1)}
          disabled={pageNum === 0}
        >
          {"<"}
        </button>

        <button type="submit" disabled={pageNum !== 4}>
          Submit
        </button>
        <button
          type="button"
          onClick={flipPage.bind(null, 1)}
          disabled={pageNum === 4}
        >
          {">"}
        </button>
      </div>
    </form>
  );
};
export default CreateItemModal;
