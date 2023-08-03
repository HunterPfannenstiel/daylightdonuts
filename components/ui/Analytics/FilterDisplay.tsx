import { FunctionComponent } from 'react';
import classes from './FilterDisplay.module.css';
import { AnalyticParams } from '@_types/database/analytics';

interface FilterDisplayProps {
	filter?: AnalyticParams;
}

const FilterDisplay: FunctionComponent<FilterDisplayProps> = ({ filter }) => {
	if (filter) {
		return (
			<div className={classes.container}>
				<h2 className={classes.title}>Current Filters</h2>
				<div className={classes.filter_info}>
					{filter.itemCategory && <p>Item Category: {filter.itemCategory}</p>}
					{filter.itemName && <p>Item Name: {filter.itemName}</p>}
					{!filter.itemCategory && !filter.itemName && <p>All Items</p>}
					<p>
						Date Range: {filter.startDate} to {filter.endDate}
					</p>
					<p>Time Scale: {filter.timeUnit.slice(0, 1).toUpperCase() + filter.timeUnit.slice(1)}</p>
					{filter.preserveNullDates && <p>Null dates preservered</p>}
				</div>
			</div>
		);
	} else return <h2 className={classes.title}>No Filter Set</h2>;
};

export default FilterDisplay;
