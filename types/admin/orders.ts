import { Extra } from "@_types/database/cart";

export type DBOrder = {
  order_id: string;
  customer_info: {
    name: string;
    email: string;
    phone_number: string;
  };
  pickup_date: string;
  pickup_time: string;
  location: string;
  is_printed: boolean;
  is_verified: boolean;
  error_message: string | null;
  payment_processor: PaymentProcessor;
  payment_uid: string;
  last_modified: Date;
  order_contents: LabelSection[];
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

export type LabelSection = {
  name: string; //item name
  amount: number;
  breakdown: LabelItem[];
};

type LabelItem = {
  extras: Extra[] | null;
  amount: number;
};
