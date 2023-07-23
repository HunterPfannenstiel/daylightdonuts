import { FunctionComponent, useState } from "react";
import { format } from "date-fns";
import classes from "./Calendar.module.css";
import Button from "components/ui/Reusable/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { formatDate } from "@_utils/orders/dates";
import Calendar from "components/ui/Reusable/Calendar/Calendar";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";

interface CalendarProps {
  updateDate: (date: string) => void;
}

const DateSelect: FunctionComponent<CalendarProps> = ({ updateDate }) => {
  const modal = useAnimateModal(300);
  const [selectedDate, setSelectedDate] = useState("Select a Date");
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(format(date, "PP"));
      updateDate(formatDate(date));
    }
  };

  return (
    <>
      <input
        readOnly
        value={selectedDate}
        onClick={modal.handleModal}
        name="date"
        id="date"
        className={classes.date_input}
      />

      <ModalDisplay {...modal.getModalProps()}>
        <Calendar
          mode="single"
          handleDateSelected={handleDateSelect}
          disabled={{ before: new Date() }}
        />
        <Button
          color="var(--primary-blue)"
          width="100%"
          type="button"
          onClick={modal.handleModal}
        >
          Confirm Date
        </Button>
      </ModalDisplay>
    </>
  );
};

export default DateSelect;
