import { FunctionComponent, useEffect, useRef, useState } from 'react';
import classes from './Analytics.module.css';
import { useQuery } from '@tanstack/react-query';
import { DonutAnalytics } from '@_types/database/analytics';
import LineChart from './Charts/LineChart';
import { ChartData } from 'chart.js';
import APIRequest from 'custom-objects/Fetch';
import useAnalytics from './useAnalytics';
import { transformAnalytics } from './Charts/ChartHelper';
import AnalyticsRangeSelector from './AnalyticsRangeSelecter';

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
	const { setDateRange, setTimeUnit, analytics, isLoading, isError } =
		useAnalytics({ startDate: '2023-06-01', endDate: '2023-08-01' });
	const [chartData, setChartData] = useState<ChartData>({
		labels: ['day 1', 'day 2', 'day 3'],
		datasets: [{ label: 'donut sales', data: [1, 20, 30] }],
	});

	useEffect(() => {
		if (analytics) setChartData(transformAnalytics(analytics));
	}, [analytics]);

	if (isLoading) return <p>Loading...</p>;

	if (!isError && !isLoading) {
		return (
			<>
				<div className={classes.chart}>
					<LineChart chartData={chartData as ChartData<'line'>} />
				</div>
				<AnalyticsRangeSelector setDateRange={setDateRange} setTimeUnit={setTimeUnit}/>
			</>
		);
	}

	return (
		<div>
			<p>Analytics</p>
		</div>
	);
};

export default Analytics;
