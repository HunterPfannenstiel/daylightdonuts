import { FunctionComponent, useState } from "react";
import { format } from "date-fns";

import classes from "./Calendar.module.css";
import Button from "components/ui/Reusable/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { CustomerInfo } from "@_types/payment";
import { formatDate } from "@_utils/orders/dates";
import Calendar from "components/ui/Reusable/Calendar/Calendar";

interface CalendarProps {
  customerInfo: CustomerInfo;
}

const DateSelect: FunctionComponent<CalendarProps> = ({ customerInfo }) => {
  const { handleModal, playAnimation, showModal } = useAnimateModal(300);
  const [selectedDate, setSelectedDate] = useState<string>("Select a Date");
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(format(date, "PP"));
      customerInfo.pickupDate = formatDate(date);
    }
  };

  const handleDateInput = () => {
    handleModal();
  };

  const animateClass = playAnimation ? classes.animate_out : "";
  return (
    <>
      <input
        readOnly
        value={selectedDate}
        onClick={handleDateInput}
        name="date"
        id="date"
        className={classes.date_input}
      />
      {showModal && (
        <>
          <div
            className={classes.background + " " + animateClass}
            onClick={handleDateInput}
          />
          <div className={classes.wrapper + " " + animateClass}>
            <Calendar
              mode="single"
              handleDateSelected={handleDateSelect}
              disabled={{ before: new Date() }}
            />
            <Button
              color="var(--primary-blue)"
              width="100%"
              type="button"
              onClick={handleDateInput}
            >
              Confirm Date
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default DateSelect;
