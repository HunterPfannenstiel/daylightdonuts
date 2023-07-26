import { FunctionComponent, useRef, useState } from 'react';
import classes from './AnalyticsRangeSelector.module.css';
import { AnalyticParams, TimeUnit } from '@_types/database/analytics';
import { DayPicker, DateRange as PickerDateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { convertDateToString } from './Charts/ChartHelper';
import ToggleSelections from '../Reusable/ToggleSelections';

interface AnalyticsRangeSelectorProps {
	setAnalyticParams: (analyticParams: AnalyticParams) => void;
	defaultValues?: AnalyticParams;
	itemNames?: { name: string }[];
	categoryNames?: { name: string }[];
}

const AnalyticsRangeSelector: FunctionComponent<
	AnalyticsRangeSelectorProps
> = ({ setAnalyticParams, defaultValues: dV, itemNames, categoryNames }) => {
	const [range, setRange] = useState<PickerDateRange | undefined>(
		dV
			? {
					from: new Date(dV.startDate),
					to: new Date(dV.endDate),
			  }
			: undefined
	);
	const [timeUnit, setTimeUnit] = useState(dV?.timeUnit || TimeUnit.Day);

	let filter: 'All' | 'Name' | 'Category' = 'All';
	if (dV) {
		if (dV.itemCategory) filter = 'Category';
		else if (dV.itemName) filter = 'Name';
	}
	const [itemTypeFilter, setItemTypeFilter] = useState<
		'All' | 'Name' | 'Category'
	>(filter);

	const itemCategoryRef = useRef<HTMLSelectElement>(null);
	const itemNameRef = useRef<HTMLSelectElement>(null);
	const preserveNullsRef = useRef<HTMLInputElement>(null);

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
			itemCategory: itemCategoryRef.current
				? itemCategoryRef.current.value
				: null,
			itemName: itemNameRef.current ? itemNameRef.current.value : null,
		};
		setAnalyticParams(analyticParams);
		console.log({ fromString, toString });
	};

	return (
		<div className={classes.container}>
			<h1>Filters</h1>
			<ToggleSelections
				selections={Object.keys(TimeUnit)}
				selected={timeUnit}
				onChange={(selection) => setTimeUnit(TimeUnit[selection])}
				comparator={(selection, selected) => TimeUnit[selection] === selected}
				prefixTitle="Time Unit:"
				className={classes.selections}
				selectedId={classes.selected}
			/>
			<div className={classes.date_range}>
				<p>Date Range:</p>
				<DayPicker
					id="analytics-date-range"
					mode="range"
					selected={range}
					onSelect={setRange}
					className={classes.rdp}
				/>
			</div>
			<ToggleSelections
				selections={['All', 'Category', 'Name']}
				selected={itemTypeFilter}
				onChange={setItemTypeFilter}
				prefixTitle="Type Filter:"
				className={classes.selections}
				selectedId={classes.selected}
			/>
			<form>
				{itemTypeFilter === 'Category' && (
					<div className={classes.selection}>
						<label htmlFor="itemCategory">Item Category:</label>
						<select
							name="itemCategory"
							id="itemCategory"
							ref={itemCategoryRef}
							defaultValue={dV?.itemCategory || ''}
						>
							{categoryNames?.map(({ name }) => {
								return <option value={name}>{name}</option>;
							})}
						</select>
					</div>
				)}
				{itemTypeFilter === 'Name' && (
					<div className={classes.selection}>
						<label htmlFor="itemName">Item Name:</label>
						<select
							name="itemName"
							id="itemName"
							ref={itemNameRef}
							defaultValue={dV?.itemName || ''}
						>
							{itemNames?.map(({ name }) => {
								return <option value={name}>{name}</option>;
							})}
						</select>
					</div>
				)}
				<div className={classes.selection}>
					<label htmlFor="preserveNulls">Preserve Null Dates:</label>
					<input
						type="checkbox"
						id="preserveNulls"
						ref={preserveNullsRef}
						defaultChecked={dV ? dV.preserveNullDates : true}
					/>
				</div>
			</form>
			<button onClick={confirmSelections} className={classes.selection_button}>
				Confirm Selections
			</button>
		</div>
	);
};

export default AnalyticsRangeSelector;
