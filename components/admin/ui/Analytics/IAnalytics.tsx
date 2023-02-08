import { useAnalyticsInfo } from "@_providers/Analytics/AnalyticsInfo";
import { FunctionComponent } from "react";
import IPageDisplay from "../Reusable/PageDisplay/IPageDisplay";
import classes from "./IAnalytics.module.css";
import Chart from "./Chart/Chart";
import InfoSelect from "./InfoSelect/InfoSelect";

interface AnalyticsProps {}

const IAnalytics: FunctionComponent<AnalyticsProps> = () => {
  const { analytics, displayRange } = useAnalyticsInfo();
  return (
    <IPageDisplay title="Analytics">
      <InfoSelect />
      {analytics?.data && <Chart title={displayRange} analytics={analytics} />}
    </IPageDisplay>
  );
};

export default IAnalytics;
