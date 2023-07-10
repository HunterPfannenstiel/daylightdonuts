import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import classes from './AnalyticsRangeSelector.module.css';
import { AnalyticParams, TimeUnit } from '@_types/database/analytics';
import { DayPicker, DateRange as PickerDateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { convertDateToString } from './Charts/ChartHelper';
import APIRequest from 'custom-objects/Fetch';

interface AnalyticsRangeSelectorProps {
	setAnalyticParams: Dispatch<SetStateAction<AnalyticParams | null>>;
}

const AnalyticsRangeSelector: FunctionComponent<
	AnalyticsRangeSelectorProps
> = ({ setAnalyticParams }) => {
	const [range, setRange] = useState<PickerDateRange | undefined>();
	const [timeUnit, setTimeUnit] = useState(TimeUnit.day);
	const [itemNames, setItemNames] = useState<{ name: string }[]>();
	const [categoryNames, setCategoryNames] = useState<{ name: string }[]>();

	const itemCategoryRef = useRef<HTMLSelectElement>(null);
	const itemNameRef = useRef<HTMLSelectElement>(null);
	const preserveNullsRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const getItemNames = async () => {
			const res = await Promise.all([
				APIRequest.request<{ name: string }[]>('/api/menu/names?item=true'),
				APIRequest.request<{ name: string }[]>('/api/menu/names?category=true'),
			]);
			setItemNames(res[0].data);
			setCategoryNames(res[1].data);
		};
		getItemNames();
	}, []);

	const confirmSelections = () => {
		if (!range) return;
		const { from, to } = range;
		if (!from || !to) return;

		const fromString = convertDateToString(from);
		const toString = convertDateToString(to);
		const analyticParams = {
			startDate: fromString,
			endDate: toString,
			timeUnit,
			preserveNullDates: preserveNullsRef.current!.checked,
			itemCategory:
				itemCategoryRef.current!.value === ''
					? null
					: itemCategoryRef.current!.value,
			itemName:
				itemNameRef.current!.value === '' ? null : itemNameRef.current!.value,
		};
		setAnalyticParams(analyticParams);
		console.log({ fromString, toString });
	};

	return (
		<>
			{Object.values(TimeUnit).map((curTimeUnit) => (
				<button
					onClick={setTimeUnit.bind(this, curTimeUnit)}
					className={curTimeUnit === timeUnit ? classes.time_unit_selected : ''}
				>
					{curTimeUnit}
				</button>
			))}
			<DayPicker
				id="analytics-date-range"
				mode="range"
				selected={range}
				onSelect={setRange}
			/>
			<form>
				<label htmlFor="itemCategory">Item Category</label>
				<select name="itemCategory" id="itemCategory" ref={itemCategoryRef}>
					{categoryNames?.map(({ name }) => {
						return <option value={name}>{name}</option>;
					})}
				</select>
				<label htmlFor="itemName">Item Name</label>
				<select name="itemName" id="itemName" ref={itemNameRef}>
					{itemNames?.map(({ name }) => {
						return <option value={name}>{name}</option>;
					})}
				</select>
				<label htmlFor="preserveNulls">Preserve Null Dates</label>
				<input type="checkbox" id="preserveNulls" ref={preserveNullsRef} />
			</form>
			<button onClick={confirmSelections}>Confirm Selections</button>
		</>
	);
};

export default AnalyticsRangeSelector;
