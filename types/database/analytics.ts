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
    "Day" = "day",
    "Week" = "week",
    "Month" = "month",
    "Year" = "year"
}

export enum AnalyticDisplayValue {
    "Amount Sold" = "Amount Sold",
    "Total Value" = "Total Value"
}