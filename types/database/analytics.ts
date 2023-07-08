export type DonutAnalytics = {
    year: number,
    month: number,
    day: number,
    amount: string,
    total: string
}

export type AnalyticParams = {
	startDate: string,
	endDate: string,
	timeUnit: TimeUnit,
	preserveNullDates: boolean,
	itemCategory: string | null,
	itemName: string | null
}

export enum TimeUnit {
    "day" = "day",
    "week" = "week",
    "month" = "month",
    "year" = "year"
}