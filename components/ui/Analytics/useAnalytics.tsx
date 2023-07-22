import { AnalyticParams, DonutAnalytics } from '@_types/database/analytics';
import { useQuery } from '@tanstack/react-query';
import APIRequest from 'custom-objects/Fetch';
import { useEffect, useState } from 'react';

let itemNames: { name: string }[] = [];
let categoryNames: { name: string }[] = [];

const useAnalytics = () => {
	const [analyticParams, setAnalyticParams] = useState<
		AnalyticParams | undefined
	>();

	useEffect(() => {
		const getItemNames = async () => {
			const res = await Promise.all([
				APIRequest.request<{ name: string }[]>('/api/menu/names?item=true'),
				APIRequest.request<{ name: string }[]>('/api/menu/names?category=true'),
			]);
			itemNames = res[0].data || [];
			categoryNames = res[1].data || [];
		};
		getItemNames();
	}, []);

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
		analyticParams,
		analytics: data,
		isLoading,
		isError,
		itemNames,
		categoryNames,
	};
};

export default useAnalytics;
