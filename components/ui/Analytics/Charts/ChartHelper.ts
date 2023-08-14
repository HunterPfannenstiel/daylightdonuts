import {
	AnalyticDisplayValue,
	AnalyticParams,
	DonutAnalytics,
} from '@_types/database/analytics';

export const transformAnalytics = (
	analytics: DonutAnalytics[],
	displayValue: AnalyticDisplayValue,
	filter?: AnalyticParams
) => {
	const [dataPoints, labels] = transformData(analytics, displayValue);
	const label = createLabel(displayValue, filter);
	console.log(filter);
	return {
		labels,
		datasets: [{ label, data: dataPoints }],
	};
};

export const convertDateToString = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const setDataset = (
	analytics: DonutAnalytics[],
	displayValue: AnalyticDisplayValue,
	filter?: AnalyticParams
): [{label: string, data: number[]}] => {
	const dataPoints: number[] = [];
	if (displayValue === AnalyticDisplayValue['Amount Sold']) {
		analytics?.forEach((point) => dataPoints.push(+point.amount));
	} else {
		analytics?.forEach((point) => dataPoints.push(+point.total));
	}
	const label = createLabel(displayValue, filter);
	return [{ label, data: dataPoints}];
};

const createLabel = (
	displayValue: AnalyticDisplayValue,
	filter?: AnalyticParams
) => {
	let label = filter
		? filter.itemCategory || filter.itemName || 'All Items'
		: 'All Items';
	label += ` (${displayValue})`;
	return label;
};

const transformData = (
	analytics: DonutAnalytics[],
	displayValue: AnalyticDisplayValue
): [number[], string[]] => {
	const labels: string[] = [];
	const dataPoints: number[] = [];
	const date = new Date();
	analytics?.forEach((point) => {
		date.setDate(point.day);
		date.setMonth(point.month - 1);
		date.setFullYear(point.year);
		labels.push(
			date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			})
		);
		dataPoints.push(
			displayValue === AnalyticDisplayValue['Amount Sold']
				? +point.amount
				: +point.total
		);
	});
	return [dataPoints, labels];
};

/*new Date(`${point.year}-${point.month}-${point?.day}`)*/
