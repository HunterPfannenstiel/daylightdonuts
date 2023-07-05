import { DonutAnalytics } from '@_types/database/analytics';

export const transformAnalytics = (analytics: DonutAnalytics[]) => {
	const labels: string[] = [];
	const dataPoints: number[] = [];
	analytics?.forEach((point) => {
		labels.push(
			new Date(`${point.year}-${point.month}-${point.day}`).toLocaleDateString(
				'en-US',
				{
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				}
			)
		);
		dataPoints.push(+point.amount);
	});
	return {
		labels,
		datasets: [{ label: 'Amount of donuts sold', data: dataPoints }],
	};
};
