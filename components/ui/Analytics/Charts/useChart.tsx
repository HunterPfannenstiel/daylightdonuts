import {
	AnalyticDisplayValue,
	AnalyticParams,
	DonutAnalytics,
} from '@_types/database/analytics';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { setDataset, transformAnalytics } from './ChartHelper';

export const useChart = (
	analytics?: DonutAnalytics[],
	analyticFilter?: AnalyticParams
) => {
	const [chartData, setChartData] = useState<ChartData>({
		labels: ['day 1', 'day 2', 'day 3'],
		datasets: [{ label: 'donut sales', data: [1, 20, 30] }],
	});
	const [displayValue, setDisplayValue] = useState<AnalyticDisplayValue>(
		AnalyticDisplayValue['Total Value']
	);

	const updateChartData = (
		analytics: DonutAnalytics[],
		display: AnalyticDisplayValue = displayValue
	) => {
		setChartData(transformAnalytics(analytics, display, analyticFilter));
	};

	const changeDisplayValue = (value: AnalyticDisplayValue) => {
		if (value !== displayValue && analytics) {
			const newDataset = setDataset(analytics, value, analyticFilter);
			setChartData((chartData) => {
				chartData.datasets = newDataset;
				return chartData;
			});
			setDisplayValue(value);
		}
	};

	useEffect(() => {
		if (analytics)
			setChartData(transformAnalytics(analytics, displayValue, analyticFilter));
	}, [analytics]);

	return {
		updateChartData,
		changeDisplayValue,
		chartData,
		displayValue,
	};
};
