export type DonutAnalytics = {
    year: number,
    month: string,
    week?: number,
    day?: number,
    amount: string
}

export enum TimeUnits {
    "day",
    "week",
    "month",
    "year"
}