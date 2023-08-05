import { FunctionComponent } from 'react';
import classes from './AnalyticsDateSelector.module.css';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface AnalyticsDateSelectorProps {
	setSelectionRange: (dates: Range) => void;
	selectionRange: Range;
}

const currentDate = new Date();
const currentDateStr = currentDate.toISOString().split('T')[0];

const AnalyticsDateSelector: FunctionComponent<AnalyticsDateSelectorProps> = ({
	setSelectionRange,
	selectionRange,
}) => {
	return (
		<>
			<DateRange
				ranges={[selectionRange]}
				onChange={(ranges) => {
					setSelectionRange({
						startDate: ranges.range1.startDate,
						endDate: ranges.range1.endDate,
					});
				}}
				minDate={new Date('2020-01-01')}
				maxDate={new Date()}
				rangeColors={['#003472']}
				className={classes.calendar}
			/>
			<div className={classes.fallback_calendar}>
				<input
					type="date"
					defaultValue={
						selectionRange.startDate?.toISOString().split('T')[0] ||
						currentDateStr
					}
					onChange={(e) => {
						setSelectionRange({
							startDate: new Date(e.currentTarget.value),
							endDate: selectionRange.endDate,
						});
					}}
					max={selectionRange.endDate?.toISOString().split('T')[0]}
				/>
				<input
					type="date"
					defaultValue={
						selectionRange.endDate?.toISOString().split('T')[0] ||
						currentDateStr
					}
					onChange={(e) => {
						setSelectionRange({
							startDate: selectionRange.startDate,
							endDate: new Date(e.currentTarget.value),
						});
					}}
					min={selectionRange.startDate?.toISOString().split('T')[0]}
                    max={currentDateStr}
				/>
			</div>
		</>
	);
};

export default AnalyticsDateSelector;
