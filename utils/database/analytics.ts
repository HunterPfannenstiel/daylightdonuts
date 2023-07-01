import { DonutAnalytics } from "@_types/database/analytics";
import { customerQuery } from "./connect";

export const getAnalytics = async (beginDate: string, endDate: string, donutType: string | null, timeUnit: string) => {
    let query = "";
    if (timeUnit === "day") query = "SELECT * FROM store.get_daily_donuts_sold($1, $2, $3)";
    else if (timeUnit === "week") query = "SELECT * FROM store.get_weekly_donuts_sold($1, $2, $3)";
    else if (timeUnit === "month") query = "SELECT * FROM store.get_monthly_donuts_sold($1, $2, $3)";

    if (query === "") return null;
    const res = await customerQuery(query, [beginDate, endDate, donutType]);
    return res.rows as DonutAnalytics[];
}