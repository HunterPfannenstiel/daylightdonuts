import { FunctionComponent, useRef } from "react";
import classes from "./ItemAvailability.module.css";
import styles from "react-day-picker/dist/style.module.css";
import { DayPicker } from "react-day-picker";
import {
  ItemRange,
  SelectedWeekdays,
  UpdateRangeAvailability,
} from "@_types/admin/forms";

//CHECKBOX

interface ItemAvailabilityProps {
  selectedWeekdays: SelectedWeekdays;
  availabilityRanges: ItemRange[];
  updateWeekdayHandler: (key: number) => void;
  updateRangeHandler: (update: UpdateRangeAvailability) => void;
}

const ItemAvailability: FunctionComponent<ItemAvailabilityProps> = ({
  selectedWeekdays,
  availabilityRanges,
  updateWeekdayHandler,
  updateRangeHandler,
}) => {
  return (
    <fieldset>
      <h2>Weekdays</h2>
      {weekdays.map((weekday) => {
        return (
          <div>
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
      {availabilityRanges.length !== 0 && (
        <>
          <h2>Range Availability</h2>
          {availabilityRanges.map((range, i) => {
            {
              range.isNewRange && (
                <div>
                  <p>{`From: ${range.range.from}`}</p>
                  <button>Update</button>
                  <button onClick={updateRangeHandler.bind(null, { index: i })}>
                    X
                  </button>
                </div>
              );
            }
            {
              !range.isNewRange && (
                <div>
                  <p>{range.range}</p>
                  <button onClick={updateRangeHandler.bind(null, { index: i })}>
                    X
                  </button>
                </div>
              );
            }
          })}
        </>
      )}
      <DayPicker
        mode="range"
        classNames={classNames}
        onSelect={(range) => {
          if (range) updateRangeHandler({ range });
        }}
      />
    </fieldset>
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
