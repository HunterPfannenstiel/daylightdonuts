import useAnalytics from "@_hooks/admin/analytics/useAnalytics";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import { analyticFetcher, getInitialAnalytics } from "./utils";

const AnalyticsInfo = createContext(getInitialAnalytics());

export const AnalyticsInfoProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const { analytics, setInterval, displayRange, setPickerRange, setSumBy } =
    useAnalytics(analyticFetcher, "analytics");

  console.count("Analytics");
  console.log(analytics);
  const value = {
    analytics,
    displayRange,
    setInterval,
    setPickerRange,
    setSumBy,
  };
  return (
    <AnalyticsInfo.Provider value={value}>{children}</AnalyticsInfo.Provider>
  );
};

export const useAnalyticsInfo = () => {
  return useContext(AnalyticsInfo);
};
