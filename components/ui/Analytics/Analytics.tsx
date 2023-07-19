import { FunctionComponent, useEffect, useState } from 'react';
import classes from './Analytics.module.css';
import LineChart from './Charts/LineChart';
import { ChartData } from 'chart.js';
import useAnalytics from './useAnalytics';
import { transformAnalytics } from './Charts/ChartHelper';
import AnalyticsRangeSelector from './AnalyticsRangeSelector';
import { useChart } from './Charts/useChart';
import ToggleSelections from '../Reusable/ToggleSelections';
import { AnalyticDisplayValue } from '@_types/database/analytics';

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
	const { setAnalyticParams, analytics, isLoading, isError } = useAnalytics();
	const { changeDisplayValue, chartData, displayValue } = useChart(analytics);

	const [showRangeSelector, setShowRangeSelector] = useState(false);

	if (isLoading) return <p>Loading...</p>;

	if (!isError && !isLoading) {
		return (
			<>
				<div className={classes.chart}>
					<ToggleSelections
						selections={Object.values(AnalyticDisplayValue)}
						prefixTitle='Analytic:'
						selected={displayValue}
						className={classes.analytic_selections}
						selectedClassName={classes.selected_analytic}
						onChange={changeDisplayValue}
					/>
					<LineChart chartData={chartData as ChartData<'line'>} />
				</div>
				<button onClick={() => setShowRangeSelector(!showRangeSelector)}>
					Edit Filters
				</button>
				{showRangeSelector && (
					<AnalyticsRangeSelector setAnalyticParams={setAnalyticParams} />
				)}
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
