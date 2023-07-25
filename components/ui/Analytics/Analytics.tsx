import { FunctionComponent } from 'react';
import classes from './Analytics.module.css';
import LineChart from './Charts/LineChart';
import { ChartData } from 'chart.js';
import useAnalytics from './useAnalytics';
import AnalyticsRangeSelector from './AnalyticsRangeSelector';
import { useChart } from './Charts/useChart';
import ToggleSelections from '../Reusable/ToggleSelections';
import {
	AnalyticDisplayValue,
	AnalyticParams,
} from '@_types/database/analytics';
import useAnimateModal from '@_hooks/animation/useAnimateModal';
import ModalDisplay from '../Reusable/Modal/ModalDisplay';

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
	const {
		setAnalyticParams,
		analytics,
		analyticParams,
		isError,
		itemNames,
		categoryNames,
	} = useAnalytics();
	const { changeDisplayValue, chartData, displayValue } = useChart(analytics, analyticParams);
	const modalProps = useAnimateModal(300);

	const onSetAnalyticParams = (analyticParams: AnalyticParams) => {
		modalProps.handleModal();
		setAnalyticParams(analyticParams);
	};

	if (isError) return <p>An error occurred...</p>;

	return (
		<>
			<div className={classes.chart}>
				<LineChart chartData={chartData as ChartData<'line'>} />
				<ToggleSelections
					selections={Object.values(AnalyticDisplayValue)}
					prefixTitle="Analytic:"
					selected={displayValue}
					className={classes.analytic_selections}
					selectedClassName={classes.selected_analytic}
					onChange={changeDisplayValue}
				/>
			</div>
			<button onClick={modalProps.handleModal}>Edit Filters</button>
			{modalProps.showModal && (
				<ModalDisplay {...modalProps.getModalProps()}>
					<AnalyticsRangeSelector
						setAnalyticParams={onSetAnalyticParams}
						defaultValues={analyticParams}
						itemNames={itemNames}
						categoryNames={categoryNames}
					/>
				</ModalDisplay>
			)}
		</>
	);
};

export default Analytics;
