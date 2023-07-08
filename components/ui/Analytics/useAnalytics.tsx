import { DateRange } from '@_types/admin/orders';
import {
	AnalyticParams,
	DonutAnalytics,
	TimeUnit,
} from '@_types/database/analytics';
import { useQuery } from '@tanstack/react-query';
import APIRequest from 'custom-objects/Fetch';
import { useState } from 'react';

const useAnalytics = () => {
	const [analyticParams, setAnalyticParams] = useState<AnalyticParams | null>(
		null
	);

	const fetchAnalytics = async () => {
		if (!analyticParams) return [];
		const {
			startDate,
			endDate,
			timeUnit,
			preserveNullDates,
			itemCategory,
			itemName,
		} = analyticParams;

		let url = `/api/admin/analytics/items-sold?beginDate=${startDate}&endDate=${endDate}&timeUnit=${timeUnit}`;
		if (preserveNullDates) url += '&preserveNullDates';
		if (itemCategory) url += `&itemCategory=${itemCategory}`;
		if (itemName) url += `&itemName=${itemName}`;
		
		const { data, success, errorMessage } = await APIRequest.request<
			DonutAnalytics[]
		>(url);
		if (!success) throw new Error(errorMessage);
		return data;
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ['analytics', analyticParams],
		queryFn: fetchAnalytics,
	});
	return {
		setAnalyticParams,
		analytics: data,
		isLoading,
		isError,
	};
};

export default useAnalytics;
