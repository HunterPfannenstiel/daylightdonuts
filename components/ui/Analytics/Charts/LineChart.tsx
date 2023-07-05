import { FunctionComponent } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS, Point, CategoryScale } from 'chart.js/auto';
import classes from './LineChart.module.css';

ChartJS.register(CategoryScale);

interface LineChartProps {
    chartData: ChartData<"line", (number | Point | null)[], unknown>;
}

const LineChart: FunctionComponent<LineChartProps> = ({ chartData }) => {
	return <Line data={chartData}/>;
};

export default LineChart;
