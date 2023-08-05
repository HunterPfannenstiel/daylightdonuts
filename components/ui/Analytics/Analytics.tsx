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
import FilterDisplay from './FilterDisplay';

interface AnalyticsProps {}

const Analytics: FunctionComponent<AnalyticsProps> = () => {
	const {
		setAnalyticParams,
		analytics,
		analyticParams,
		isError,
		isLoading,
		itemNames,
		categoryNames,
	} = useAnalytics(() => {
		if (modalProps.showModal) modalProps.handleModal();
	});
	const { changeDisplayValue, chartData, displayValue } = useChart(
		analytics,
		analyticParams
	);
	const modalProps = useAnimateModal(300);

	const onSetAnalyticParams = (analyticParams: AnalyticParams) => {
		setAnalyticParams(analyticParams);
		//modalProps.handleModal(); getting handled by the method passed to useAnalytics
	};

	if (isError) return <p>An error occurred...</p>;

	return (
		<div className={classes.container}>
			<div className={classes.chart}>
				<LineChart chartData={chartData as ChartData<'line'>} />
				<div className={classes.selections}>
					<p>Analytic: </p>
					<ToggleSelections
						selections={Object.values(AnalyticDisplayValue)}
						selected={displayValue}
						className={classes.selection_buttons}
						selectedId={classes.selected}
						onChange={changeDisplayValue}
					/>
				</div>
			</div>
			<div className={classes.filter}>
				<FilterDisplay filter={analyticParams} />
				<button onClick={modalProps.handleModal}>Edit Filters</button>
			</div>
			{modalProps.showModal && (
				<ModalDisplay
					{...modalProps.getModalProps()}
					closeable={!isLoading}
					className={classes.modal}
				>
					<AnalyticsRangeSelector
						setAnalyticParams={onSetAnalyticParams}
						defaultValues={analyticParams}
						itemNames={itemNames}
						categoryNames={categoryNames}
						isLoading={isLoading}
					/>
				</ModalDisplay>
			)}
		</div>
	);
};

export default Analytics;
