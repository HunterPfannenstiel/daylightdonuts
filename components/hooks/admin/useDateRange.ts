import { DateRange, Interval } from "@_types/admin/orders";
import { formatDate, getRange } from "@_utils/orders/dates";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange as PickerRange } from "react-day-picker";

const useDateRange = <T extends Interval>(startingRange: T) => {
  const [interval, setInterval] = useState<T>(startingRange);
  const [pickerRange, setPickerRange] = useState<PickerRange>();
  const [dateRange, setDateRange] = useState<DateRange>(getRange(interval));
  useEffect(() => {
    console.log(interval);
    setDateRange(getRange(interval));
  }, [interval]);

  useEffect(() => {
    if (pickerRange) {
      if (pickerRange.from && pickerRange.to) {
        setDateRange({
          startDate: formatDate(pickerRange.from),
          endDate: formatDate(pickerRange.to),
        });
      } else if (pickerRange.from) {
        setDateRange({
          startDate: formatDate(pickerRange.from),
          endDate: formatDate(pickerRange.from),
        });
      }
    }
  }, [pickerRange]);
  return {
    setInterval,
    setPickerRange,
    dateRange,
    displayRange: formatDateRange(dateRange),
  };
};

const formatDateRange = (dateRange: DateRange) => {
  if (dateRange.startDate === dateRange.endDate) {
    return format(new Date(dateRange.startDate), "PP");
  } else {
    return `${format(new Date(dateRange.startDate), "PP")} - ${format(
      new Date(dateRange.endDate),
      "PP"
    )}`;
  }
};

export default useDateRange;
