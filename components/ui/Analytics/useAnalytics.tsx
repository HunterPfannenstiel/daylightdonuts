import { TimeUnits } from '@_types/database/analytics';
import { useState } from 'react';

const useAnalytics = () => {
	const [timeUnit, setTimeUnit] = useState<TimeUnits>(TimeUnits.day);
	const [dateRange, setDateRange] = useState<Date>();
};

export default useAnalytics;
