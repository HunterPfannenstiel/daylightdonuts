import { FunctionComponent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import classes from "./RangeCalendar.module.css";

interface RangeCalendarProps {
  className: string;
  onRangeChange: (range: DateRange | undefined) => void;
}

const RangeCalendar: FunctionComponent<RangeCalendarProps> = ({
  className,
  onRangeChange,
}) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const onChange = (range: DateRange | undefined) => {
    onRangeChange(range);
    setRange(range);
  };

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={onChange}
      classNames={{ ...styles }}
      className={className}
    />
  );
};

export default RangeCalendar;
