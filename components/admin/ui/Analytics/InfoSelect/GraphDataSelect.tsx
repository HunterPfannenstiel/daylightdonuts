import { useAnalyticsInfo } from "@_providers/Analytics/AnalyticsInfo";
import { SumParameter } from "@_types/admin/analytics";
import { FunctionComponent } from "react";
import classes from "./GraphDataSelect.module.css";

interface GraphDataSelectProps {}

const GraphDataSelect: FunctionComponent<GraphDataSelectProps> = () => {
  const { setSumBy } = useAnalyticsInfo();
  return (
    <select
      onChange={(e) => {
        setSumBy(e.target.value as SumParameter);
      }}
    >
      <option value="Amount">Amount of Donuts Sold</option>
      <option value="Price">Gross Revenue</option>
    </select>
  );
};

export default GraphDataSelect;
