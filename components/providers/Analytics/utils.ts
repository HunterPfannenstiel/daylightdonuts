import {
  AnalyticItem,
  Analytics,
  AxisInterval,
  SumParameter,
} from "@_types/admin/analytics";
import { DateRange, Interval } from "@_types/admin/orders";
import { Dispatch, SetStateAction } from "react";
import { DateRange as range } from "react-day-picker";

type InitialAnalytics = {
  analytics: Analytics | undefined;
  displayRange: string;
  setInterval: (interval: Interval) => void;
  setPickerRange: Dispatch<SetStateAction<range | undefined>>;
  setSumBy: Dispatch<SetStateAction<SumParameter>>;
};

export const getInitialAnalytics = (): InitialAnalytics => {
  return {
    analytics: undefined,
    displayRange: "",
    setInterval: (interval: Interval) => {},
    setPickerRange: () => {},
    setSumBy: () => {},
  };
};

export const analyticFetcher = async (
  dateRange: DateRange,
  interval: AxisInterval,
  sumBy: SumParameter,
  fetchFor: AnalyticItem
) => {
  let data: Analytics;
  switch (fetchFor) {
    case "Donuts":
      data = await fetchDonutAnalytics(dateRange, interval, sumBy);
      return data;
    case "Orders":
      data = await fetchOrderAnalytics(dateRange, interval, sumBy);
      return data;
    default:
      throw new Error("Invalid analytic type");
  }
};

const fetchDonutAnalytics = async (
  dateRange: DateRange,
  interval: AxisInterval,
  sumBy: SumParameter
) => {
  const res = await fetch(
    `/api/admin/analytics/donut?start=${dateRange.startDate}&end=${dateRange.endDate}&interval=${interval}&sum=${sumBy}`
  );

  const data = await res.json();
  if (res.ok) {
    return data as Analytics;
  } else {
    throw new Error(data);
  }
};

const fetchOrderAnalytics = async (
  dateRange: DateRange,
  interval: AxisInterval,
  sumBy: SumParameter
) => {
  const res = await fetch("/api/");
  const data = await res.json();

  if (res.ok) {
    return data as Analytics;
  } else {
    throw new Error(data);
  }
};
