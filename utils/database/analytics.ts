import { DonutAnalytics } from '@_types/database/analytics';
import { customerQuery } from './connect';

export const getAnalytics = async (
	beginDate: string,
	endDate: string,
	timeUnit: string,
	preserveNullDates = false,
	itemCategory: string | null = null,
	itemName: string | null = null
) => {
	const query = 'SELECT * FROM store.get_item_analytics($1, $2, $3, $4, $5, $6)';
	const res = await customerQuery(query, [
		beginDate,
		endDate,
		timeUnit,
		preserveNullDates,
		itemCategory,
		itemName,
	]);
	return res.rows as DonutAnalytics[];
};
