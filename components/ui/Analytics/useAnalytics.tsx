import { DateRange } from '@_types/admin/orders';
import { DonutAnalytics, TimeUnit } from '@_types/database/analytics';
import { useQuery } from '@tanstack/react-query';
import APIRequest from 'custom-objects/Fetch';
import { useState } from 'react';

const useAnalytics = (
	initialDateRange?: DateRange,
	initialTimeUnit?: TimeUnit
) => {
	const [dateRange, setDateRange] = useState<DateRange | undefined | null>(
		initialDateRange
	);
	const [timeUnit, setTimeUnit] = useState<TimeUnit>(
		initialTimeUnit || TimeUnit.day
	);
	const fetchAnalytics = async () => {
		if (!dateRange) return [];
		const { data, success, errorMessage } = await APIRequest.request<
			DonutAnalytics[]
		>(
			`/api/admin/analytics/items-sold?beginDate=${
				dateRange.startDate
			}&endDate=${dateRange.endDate}&timeUnit=${timeUnit}`
		);
		if (!success) throw new Error(errorMessage);
		return data;
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ['analytics', dateRange, timeUnit],
		queryFn: fetchAnalytics,
	});
	return {
		setDateRange,
		setTimeUnit,
		analytics: data,
		isLoading,
		isError,
	};
};

export default useAnalytics;
