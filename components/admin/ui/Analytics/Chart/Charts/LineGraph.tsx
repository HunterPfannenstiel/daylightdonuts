import { ChartData, Point } from "chart.js";
import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import classes from "./LineGraph.module.css";

interface LineGraphProps {
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
}

const LineGraph: FunctionComponent<LineGraphProps> = ({ chartData }) => {
  return <Line data={chartData} options={{ scales: { y: { min: 0 } } }} />;
};

export default LineGraph;
