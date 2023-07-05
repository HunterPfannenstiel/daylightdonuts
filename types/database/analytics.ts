export type DonutAnalytics = {
    year: number,
    month: string,
    week?: number,
    day?: number,
    amount: string
}

export enum TimeUnit {
    "day" = "day",
    "week" = "week",
    "month" = "month",
    "year" = "year"
}