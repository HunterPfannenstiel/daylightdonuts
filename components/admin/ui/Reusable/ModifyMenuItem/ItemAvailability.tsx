import { FunctionComponent } from "react";
import classes from "./ItemAvailability.module.css";
import { ItemDateRange } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import RangeSelect from "@ui/Reusable/Date/RangeSelect";
import { formatDate } from "@_utils/orders/dates";
import useRangeSelect from "@ui/Reusable/Date/useRangeSelect";
import Button from "@ui/Reusable/Button";

interface ItemAvailabilityProps {
  selectedWeekdays: InitialSelections;
  availabilityRange: ItemDateRange | undefined;
  updateWeekdayHandler: (key: number) => void;
  updateRangeHandler: (range: ItemDateRange | undefined) => void;
}

const ItemAvailability: FunctionComponent<ItemAvailabilityProps> = ({
  selectedWeekdays,
  availabilityRange,
  updateWeekdayHandler,
  updateRangeHandler,
}) => {
  const [selectionRange, setSelectionRange] = useRangeSelect(
    availabilityRange && {
      startDate: new Date(availabilityRange.from),
      endDate: new Date(availabilityRange.to),
    }
  );
  const dateSelectHandler = (
    start: Date | undefined,
    end: Date | undefined
  ) => {
    if (start && end) {
      setSelectionRange(start, end);
      updateRangeHandler({ from: formatDate(start), to: formatDate(end) });
    }
  };

  const clearSelectedDate = () => {
    setSelectionRange(new Date(), new Date());
    updateRangeHandler(undefined);
  };
  return (
    <Fieldset legend="Availability">
      <div className={classes.weekdays}>
        <SelectInputList
          selections={weekdays}
          initialSelections={selectedWeekdays}
          type="checkbox"
          onSelect={(id) => {
            updateWeekdayHandler(id);
          }}
        />
      </div>
      {availabilityRange && (
        <div className={classes.range_container}>
          <h2 className={classes.range_label}>Selected Range</h2>
          <div className={classes.range}>
            <p>
              From: <span>{availabilityRange.from}</span> To:{" "}
              <span>{availabilityRange.to}</span>
            </p>
            <Button onClick={clearSelectedDate} type="button">
              Clear Range
            </Button>
          </div>
        </div>
      )}
      <RangeSelect
        dateHandler={dateSelectHandler}
        minDate={new Date()}
        range={selectionRange}
      />
    </Fieldset>
  );
};

const weekdays = [
  { name: "Sunday", id: 1 },
  { name: "Monday", id: 2 },
  { name: "Tuesday", id: 3 },
  { name: "Wednesday", id: 4 },
  { name: "Thursday", id: 5 },
  { name: "Friday", id: 6 },
  { name: "Saturday", id: 7 },
];

export default ItemAvailability;
