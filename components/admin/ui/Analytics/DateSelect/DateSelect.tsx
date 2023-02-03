import Calendar from "components/ui/Reusable/Calendar/Calendar";
import { FunctionComponent } from "react";
import classes from "./DateSelect.module.css";

interface DateSelectProps {}

const DateSelect: FunctionComponent<DateSelectProps> = () => {
  const handleSelectedDate = (date: Date | undefined) => {};
  return <Calendar mode="single" handleDateSelected={handleSelectedDate} />;
};

export default DateSelect;
