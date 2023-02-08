import { Extra } from "@_types/database/cart";

export type DBOrder = {
  order_id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  location: string;
  printed: boolean;
  payment_processor: PaymentProcessor;
  payment_id: string;
  last_modified: Date;
  order_contents: OrderItemContent[];
};

export type OrderItemContent = {
  name: string;
  extras: Extra[];
  amount: number;
};

export type PaymentProcessor = "Stripe" | "PayPal";

type OrderDetails = {
  payment_id: string;
  payment_processor: PaymentProcessor;
  email: string;
  last_modified: Date;
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type Interval = "Day" | "Week" | "Month" | "Year";

export type IntervalButton<T> = {
  label: string;
  onClick: (intervalChange: IntervalChange<T>) => void;
};

export type IntervalChange<T> = (interval: T) => void;
