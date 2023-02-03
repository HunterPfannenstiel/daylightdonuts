import { useAnalyticsInfo } from "@_providers/Analytics/AnalyticsInfo";
import { Interval } from "@_types/admin/orders";
import Radio from "components/ui/Reusable/Radio";
import { FunctionComponent } from "react";
import classes from "./RangeSelect.module.css";

interface RangeSelectProps {}

const RangeSelect: FunctionComponent<RangeSelectProps> = () => {
  const { setInterval } = useAnalyticsInfo();
  const handleRadioSelect = (range: Interval) => {
    setInterval(range);
  };
  return (
    <div className={classes.radios}>
      <Radio label="Week" onClick={handleRadioSelect.bind(null, "Week")} />
      <Radio
        label="Month"
        value="Month"
        onClick={handleRadioSelect.bind(null, "Month")}
      />
      <Radio
        label="Year"
        value="Year"
        onClick={handleRadioSelect.bind(null, "Year")}
      />
    </div>
  );
};

export default RangeSelect;
