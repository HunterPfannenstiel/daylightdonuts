import { Extra } from "@_types/database/cart";

export type DBOrder = {
  order_id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  location: string;
  printed: boolean;
  order_contents: OrderItemContent[];
};

export type OrderItemContent = {
  name: string;
  extras: Extra[];
  amount: number;
};

type PaymentProccessor = "Stripe" | "PayPal";

type OrderDetails = {
  date_created: string;
  payment_id: string;
  payment_processor: PaymentProccessor;
  total_price: string;
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
