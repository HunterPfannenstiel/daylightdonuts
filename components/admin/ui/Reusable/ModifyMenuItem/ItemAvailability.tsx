import { FunctionComponent } from "react";
import classes from "./ItemAvailability.module.css";
import styles from "react-day-picker/dist/style.module.css";
import { DayPicker } from "react-day-picker";
import { ItemDateRange, SelectedWeekdays } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";

//CHECKBOX

interface ItemAvailabilityProps {
  selectedWeekdays: SelectedWeekdays;
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
      <h2>Weekdays</h2>
      {weekdays.map((weekday) => {
        return (
          <div key={weekday.weekday_id}>
            <label htmlFor={weekday.weekday}>{weekday.weekday}</label>
            <input
              id={weekday.weekday}
              type="checkbox"
              defaultChecked={selectedWeekdays[weekday.weekday_id]}
              onChange={updateWeekdayHandler.bind(null, weekday.weekday_id)}
            />
          </div>
        );
      })}
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
  { weekday: "Sunday", weekday_id: 1 },
  { weekday: "Monday", weekday_id: 2 },
  { weekday: "Tuesday", weekday_id: 3 },
  { weekday: "Wednesday", weekday_id: 4 },
  { weekday: "Thursday", weekday_id: 5 },
  { weekday: "Friday", weekday_id: 6 },
  { weekday: "Saturday", weekday_id: 7 },
];

export default ItemAvailability;
