import { FunctionComponent, useEffect, useRef, useState } from 'react';
import classes from './Analytics.module.css';
import { useQuery } from '@tanstack/react-query';
import { DonutAnalytics } from '@_types/database/analytics';
import LineChart from './Charts/LineChart';
import { ChartData } from 'chart.js';
import APIRequest from 'custom-objects/Fetch';

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
	const [chartData, setChartData] = useState<ChartData>({
		labels: ['day 1', 'day 2', 'day 3'],
		datasets: [{ label: 'donut sales', data: [1, 20, 30] }],
	});

	const fetchAnalytics = async () => {
		const { data, success, errorMessage } = await APIRequest.request<
			DonutAnalytics[]
		>(
			'/api/admin/analytics/items-sold?beginDate=2023-02-15&endDate=2023-07-01&timeUnit=day'
		);
		if (!success) throw new Error(errorMessage);
		const labels: string[] = [];
		const dataPoints: number[] = [];
		data.forEach((point) => {
			labels.push(
				new Date(
					`${point.year}-${point.month}-${point.day}`
				).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})
			);
			dataPoints.push(+point.amount);
		});
		setChartData({
			labels,
			datasets: [{ label: 'Amount of donuts sold', data: dataPoints }],
		});
		return data;
	};

	const { isLoading, isError } = useQuery({
		queryKey: ['analytics'],
		queryFn: fetchAnalytics,
	});

	if (isLoading) return <p>Loading...</p>;

	if (!isError && !isLoading) {
		return (
			<div className={classes.chart}>
				<LineChart chartData={chartData as ChartData<'line'>} />
			</div>
		);
	}

	return (
		<div>
			<p>Analytics</p>
		</div>
	);
};

export default Analytics;
