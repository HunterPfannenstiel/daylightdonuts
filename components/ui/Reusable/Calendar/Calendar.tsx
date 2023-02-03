import { FunctionComponent, useState } from "react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import classes from "./Calendar.module.css";

interface CalendarProps extends DayPickerSingleProps {
  handleDateSelected: (date: Date | undefined) => void;
}

const Calendar: FunctionComponent<CalendarProps> = ({
  handleDateSelected,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const dateSelected = (date: Date | undefined) => {
    setSelectedDate(date);
    handleDateSelected(date);
  };
  const classNames = {
    ...styles,
  };
  return (
    <DayPicker
      {...props}
      onSelect={dateSelected}
      selected={selectedDate}
      classNames={classNames}
    />
  );
};

export default Calendar;
