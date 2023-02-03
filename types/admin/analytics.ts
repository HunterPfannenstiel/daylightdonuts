export type AxisInterval = "Day" | "Month" | "Year";

export type SumParameter = "Amount" | "Price";

export type Analytics = {
  labels: string[];
  data: number[];
};

export type DBDonutAnalytics = {
  interval: string;
  sum: number;
};

export type AnalyticItem = "Donuts" | "Orders";
