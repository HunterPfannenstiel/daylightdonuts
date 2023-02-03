import { useAnalyticsInfo } from "@_providers/Analytics/AnalyticsInfo";
import { FunctionComponent } from "react";
import IPageDisplay from "../Reusable/PageDisplay/IPageDisplay";
import classes from "./Analytics.module.css";
import Chart from "./Chart/Chart";
import DateSelect from "./DateSelect/DateSelect";
import RangeSelect from "./RangeSelect/RangeSelect";

interface AnalyticsProps {}

const IAnalytics: FunctionComponent<AnalyticsProps> = () => {
  const { analytics } = useAnalyticsInfo();
  console.log("Analytics", analytics);
  const title = "Donuts sold between Janurary 1st - Janurary 31st";
  return (
    <IPageDisplay title="Analytics">
      <RangeSelect />
      {analytics?.data && <Chart title={title} analytics={analytics} />}
      <DateSelect />
    </IPageDisplay>
  );
};

export default IAnalytics;
