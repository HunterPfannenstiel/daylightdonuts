import { DonutAnalytics } from '@_types/database/analytics';

export const transformAnalytics = (analytics: DonutAnalytics[]) => {
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
		dataPoints.push(+point.amount);
	});
	return {
		labels,
		datasets: [{ label: 'Amount of donuts sold', data: dataPoints }],
	};
};

export const convertDateToString = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/*new Date(`${point.year}-${point.month}-${point?.day}`)*/
