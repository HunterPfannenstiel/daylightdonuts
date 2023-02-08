import { useQuery } from "@tanstack/react-query";
import {
  AnalyticItem,
  Analytics,
  AxisInterval,
  SumParameter,
} from "@_types/admin/analytics";
import { DateRange, Interval } from "@_types/admin/orders";
import { useState } from "react";
import useDateRange from "../useDateRange";

type QueryFetch = (
  dateRange: DateRange,
  interval: AxisInterval,
  sumBy: SumParameter,
  fetchFor: AnalyticItem
) => Promise<Analytics>;

const useAnalytics = (fetcher: QueryFetch, keyName: string) => {
  const { dateRange, setInterval, displayRange, setPickerRange } =
    useDateRange<Interval>("Month");
  const [axisInterval, setAxisInterval] = useState<AxisInterval>("Day");
  const [fetchFor, setFetchFor] = useState<AnalyticItem>("Donuts");
  const [sumBy, setSumBy] = useState<SumParameter>("Amount");
  const { data, isLoading, isError } = useQuery(
    [keyName, dateRange, axisInterval, sumBy, fetchFor],
    fetcher.bind(null, dateRange, axisInterval, sumBy, fetchFor)
  );
  return {
    analytics: data,
    displayRange,
    isLoading,
    isError,
    setInterval,
    setAxisInterval,
    setSumBy,
    setPickerRange,
  };
};

export default useAnalytics;
