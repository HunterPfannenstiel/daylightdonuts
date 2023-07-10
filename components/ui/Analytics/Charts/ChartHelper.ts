import {
	AnalyticDisplayValue,
	DonutAnalytics,
} from '@_types/database/analytics';

export const transformAnalytics = (
	analytics: DonutAnalytics[],
	displayValue: AnalyticDisplayValue
) => {
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
			displayValue === AnalyticDisplayValue["Amount Sold"]
				? +point.amount
				: +point.total
		);
	});
	return {
		labels,
		datasets: [{ label: 'Amount of donuts sold', data: dataPoints }],
	};
};

export const convertDateToString = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const setDataset = (
	analytics: DonutAnalytics[],
	amountSold: boolean
) => {
	const res: number[] = [];
	if (amountSold) {
		analytics?.forEach((point) => res.push(+point.amount));
	} else {
		analytics?.forEach((point) => res.push(+point.total));
	}
	return res;
};

/*new Date(`${point.year}-${point.month}-${point?.day}`)*/
