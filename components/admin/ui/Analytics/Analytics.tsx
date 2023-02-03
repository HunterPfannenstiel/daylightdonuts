import { AnalyticsInfoProvider } from "@_providers/Analytics/AnalyticsInfo";
import { FunctionComponent } from "react";
import classes from "./Analytics.module.css";
import IAnalytics from "./IAnalytics";

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
  return (
    <AnalyticsInfoProvider>
      <IAnalytics />
    </AnalyticsInfoProvider>
  );
};

export default Analytics;
