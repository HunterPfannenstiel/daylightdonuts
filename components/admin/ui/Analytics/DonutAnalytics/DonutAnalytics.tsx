import useAnalytics from "@_hooks/admin/analytics/useAnalytics";
import { Analytics, AxisInterval, SumParameter } from "@_types/admin/analytics";
import { DateRange } from "@_types/admin/orders";
import { FunctionComponent } from "react";
import classes from "./DonutAnalytics.module.css";

interface DonutAnalyticsProps {}

const DonutAnalytics: FunctionComponent<DonutAnalyticsProps> = () => {
  const { analytics } = useAnalytics(fetchDonutAnalytics, "donutAnalytics");
  console.log(analytics);
  return <></>;
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

export default DonutAnalytics;
