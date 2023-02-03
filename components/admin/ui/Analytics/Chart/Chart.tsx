import { Analytics } from "@_types/admin/analytics";
import { FunctionComponent } from "react";
import classes from "./Chart.module.css";
import { register } from "@_utils/chart/register";
import LineGraph from "./Charts/LineGraph";
interface ChartProps {
  title: string;
  analytics: Analytics;
}

const Chart: FunctionComponent<ChartProps> = ({ title, analytics }) => {
  register();
  return (
    <div className={classes.chart}>
      <h2>{title}</h2>
      <LineGraph
        chartData={{
          labels: analytics.labels,
          datasets: [
            {
              label: "Donut Sales",
              data: analytics.data,
              tension: 0.1,
              backgroundColor: "#003472",
              borderColor: "#FFD503",
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
