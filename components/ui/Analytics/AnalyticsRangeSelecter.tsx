import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useState,
} from 'react';
import classes from './AnalyticsRangeSelector.module.css';
import { DateRange } from '@_types/admin/orders';
import { TimeUnit } from '@_types/database/analytics';
import { DayPicker, DateRange as PickerDateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface AnalyticsRangeSelectorProps {
	setDateRange: Dispatch<SetStateAction<DateRange | null | undefined>>;
	setTimeUnit: Dispatch<SetStateAction<TimeUnit>>;
}

let selectedTimeUnit: TimeUnit = TimeUnit.day;
const AnalyticsRangeSelector: FunctionComponent<
	AnalyticsRangeSelectorProps
> = ({ setDateRange, setTimeUnit }) => {
	const [range, setRange] = useState<PickerDateRange | undefined>();

	const confirmSelections = () => {
		if (!range) return;
		const { from, to } = range;
		if (!from || !to) return;
		console.log(range);
		const fromString = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
		const toString = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`;
		console.log({ fromString, toString });
		setDateRange({ startDate: fromString, endDate: toString });
		setTimeUnit(selectedTimeUnit);
	};

	return (
		<>
			{Object.values(TimeUnit).map((timeUnit) => (
				<button onClick={() => (selectedTimeUnit = timeUnit)}>
					{timeUnit}
				</button>
			))}
			<DayPicker
				id="analytics-date-range"
				mode="range"
				selected={range}
				onSelect={setRange}
			/>
			<button onClick={confirmSelections}>Confirm Selections</button>
		</>
	);
};

export default AnalyticsRangeSelector;
