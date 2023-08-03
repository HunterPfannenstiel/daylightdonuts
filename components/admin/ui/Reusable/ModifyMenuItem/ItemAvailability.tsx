import { FunctionComponent } from "react";
import classes from "./ItemAvailability.module.css";
import styles from "react-day-picker/dist/style.module.css";
import { DayPicker } from "react-day-picker";
import { ItemDateRange } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import { InitialSelections } from "@_hooks/admin/menu/modification/useSelections";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";

//CHECKBOX

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
        <>
          <h2>Range Availability</h2>
          <div>
            <p>{`From: ${availabilityRange.from} To: ${availabilityRange.to}`}</p>
            <button>Update</button>
            <button onClick={updateRangeHandler.bind(null, undefined)}>
              X
            </button>
          </div>
        </>
      )}
      <DayPicker
        mode="range"
        classNames={classNames}
        onSelect={(range) => {
          if (range && range.from && range.to) {
            const dateRange = {
              from: range.from?.toISOString(),
              to: range.to?.toISOString(),
            };
            updateRangeHandler(dateRange);
          }
        }}
      />
    </Fieldset>
  );
};

const classNames = {
  ...styles,
};

{
  /* <DayPicker
{...props}
onSelect={dateSelected}
selected={selectedDate}
classNames={classNames}
/> */
}

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
