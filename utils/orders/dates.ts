import { DateRange, Interval } from "@_types/admin/orders";

export const formatDate = (date: Date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const todaysDate = () => {
  const today = formatDate(new Date());
  return today;
};

export const getDayRange = (date: Date = new Date()): DateRange => {
  const formattedDate = formatDate(date);
  return {
    startDate: formattedDate,
    endDate: formattedDate,
  };
};

export const getWeekRange = (date: Date = new Date()): DateRange => {
  const day = date.getDay();
  const firstDay = date.getDate() - day;
  const startDate = getBeginningOfWeek(date, firstDay);
  const endDate = getEndOfWeek(date, firstDay);
  return {
    startDate,
    endDate,
  };
};

const getBeginningOfWeek = (date: Date, firstDay: number) => {
  let copyDate = new Date(date);
  return formatDate(new Date(copyDate.setDate(firstDay)));
};

const getEndOfWeek = (date: Date, firstDay: number) => {
  let copyDate = new Date(date);
  return formatDate(new Date(copyDate.setDate(firstDay + 6)));
};

export const getMonthRange = (date: Date = new Date()): DateRange => {
  const startDate = getBeginningOfMonth(date);
  const endDate = getEndOfMonth(date);
  return {
    startDate,
    endDate,
  };
};

const getBeginningOfMonth = (date: Date) => {
  return formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

const getEndOfMonth = (date: Date) => {
  return formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
};

export const getYearRange = (date: Date = new Date()): DateRange => {
  const startDate = getBeginningOfYear(date);
  const endDate = getEndOfYear(date);
  return {
    startDate,
    endDate,
  };
};

const getBeginningOfYear = (date: Date) => {
  return formatDate(new Date(date.getFullYear(), 0, 1));
};

const getEndOfYear = (date: Date) => {
  return formatDate(new Date(date.getFullYear() + 1, 0, 0));
};

export const getTextDate = (date: Date = new Date()) => {
  return date.toLocaleString("default", { dateStyle: "full" });
};

export const getRange = (interval: Interval, date?: Date) => {
  let range;
  switch (interval) {
    case "Day":
      range = getDayRange(date);
      break;
    case "Week":
      range = getWeekRange(date);
      break;
    case "Month":
      range = getMonthRange(date);
      break;

    case "Year":
      range = getYearRange(date);
      break;
    default:
      console.log("Invalid interval");
      break;
  }

  return range || { startDate: "", endDate: "" };
};
