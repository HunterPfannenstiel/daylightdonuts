import { IntervalButton } from "@_types/admin/orders";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { DateRange } from "react-day-picker";
import DateButtons from "./DateButtons/DateButtons";
import classes from "./DateSelect.module.css";
import RangeCalendar from "./RangeCalendar/RangeCalendar";

interface DateSelectProps {
  relativeButtons: IntervalButton<any>[];
  relativeIntervalChange: (interval: any) => void;
  absoluteIntervalChange: (interval: DateRange | undefined) => void;
}

const DateSelect: FunctionComponent<DateSelectProps> = ({
  relativeButtons,
  relativeIntervalChange,
  absoluteIntervalChange,
}) => {
  const [timeframe, setTimeframe] = useState("relative");
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(e.target.value);
  };
  return (
    <div className={classes.date_select}>
      <select onChange={handleSelectChange}>
        <option value="relative">Relative</option>
        <option value="absolute">Absolute</option>
      </select>
      {timeframe === "relative" && (
        <DateButtons
          buttons={relativeButtons}
          intervalChange={relativeIntervalChange}
        />
      )}
      {timeframe === "absolute" && (
        <p>Select a single date or select two dates to specify a range</p>
      )}
      <RangeCalendar
        className={classes.calendar}
        onRangeChange={absoluteIntervalChange}
      />
    </div>
  );
};

export default DateSelect;
