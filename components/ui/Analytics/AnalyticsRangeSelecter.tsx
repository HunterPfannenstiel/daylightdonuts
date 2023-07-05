import { Dispatch, FunctionComponent, SetStateAction, useRef } from 'react';
import classes from './AnalyticsRangeSelector.module.css';
import { DateRange } from '@_types/admin/orders';
import { TimeUnit } from '@_types/database/analytics';

interface AnalyticsRangeSelectorProps {
	setDateRange: Dispatch<SetStateAction<DateRange | null | undefined>>;
	setTimeUnit: Dispatch<SetStateAction<TimeUnit>>;
}

const AnalyticsRangeSelector: FunctionComponent<
	AnalyticsRangeSelectorProps
> = ({ setDateRange, setTimeUnit }) => {
    const dateRef = useRef<HTMLInputElement>(null);

	return (
		<>
			{Object.values(TimeUnit).map((timeUnit) => (
				<button onClick={() => setTimeUnit(timeUnit)}>{timeUnit}</button>
			))}
            <form>
                <input type="date" ref={dateRef}></input>
            </form>
		</>
	);
};

export default AnalyticsRangeSelector;
