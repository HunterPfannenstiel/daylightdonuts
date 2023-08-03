import { FunctionComponent, useRef, useState } from 'react';
import classes from './AnalyticsRangeSelector.module.css';
import { AnalyticParams, TimeUnit } from '@_types/database/analytics';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { convertDateToString } from './Charts/ChartHelper';
import ToggleSelections from '../Reusable/ToggleSelections';
import { DateRange, Range } from 'react-date-range';

interface AnalyticsRangeSelectorProps {
	setAnalyticParams: (analyticParams: AnalyticParams) => void;
	defaultValues?: AnalyticParams;
	itemNames?: { name: string }[];
	categoryNames?: { name: string }[];
}

const AnalyticsRangeSelector: FunctionComponent<
	AnalyticsRangeSelectorProps
> = ({ setAnalyticParams, defaultValues: dV, itemNames, categoryNames }) => {
	const [timeUnit, setTimeUnit] = useState(dV?.timeUnit || TimeUnit.Day);
	const [selectionRange, setSelectionRange] = useState<Range>({
		startDate: dV ? new Date(dV.startDate) : new Date(),
		endDate: dV ? new Date(dV.endDate) : new Date(),
	});

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
		if (!selectionRange) return;
		const { startDate, endDate } = selectionRange;
		if (!startDate || !endDate) return;

		const fromString = convertDateToString(startDate);
		const toString = convertDateToString(endDate);
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
				onChange={(selection) =>
					setTimeUnit(TimeUnit[selection as keyof typeof TimeUnit])
				}
				comparator={(selection, selected) =>
					TimeUnit[selection as keyof typeof TimeUnit] === selected
				}
				prefixTitle="Time Unit:"
				className={classes.selections}
				selectedId={classes.selected}
			/>
			<div className={classes.date_range}>
				<p>Date Range:</p>
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
								return (
									<option value={name} key={name}>
										{name}
									</option>
								);
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
								return (
									<option value={name} key={name}>
										{name}
									</option>
								);
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
