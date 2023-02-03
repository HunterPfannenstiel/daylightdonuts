import { ChartData } from "chart.js/dist/types/index";
import { FunctionComponent } from "react";
import { Pie } from "react-chartjs-2";
import classes from "./PieChart.module.css";

interface PieChartProps {
  chartData: ChartData<"pie", number[], unknown>;
}

const PieChart: FunctionComponent<PieChartProps> = ({ chartData }) => {
  console.log(chartData.labels);
  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: { display: true, text: "Users Gained between 2016-2020" },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
