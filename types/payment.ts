import { Extra } from "./database/cart";

export type OrderItem = {
  name: string;
  price: string;
  amount: number;
  extras: Extra[];
};

export type PaypalItem = {
  name: string;
  unit_amount: {
    currency_code: "USD";
    value: string;
  };
  quantity: string;
  category: "PHYSICAL_GOODS" | "DIGITAL_GOODS";
};

export type EligibleDozen = {
  eligibledozen: {
    price: number;
    amount: number;
    size: number;
    itemPrice: number;
  };
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  pickupDate: string;
  pickupTime: string;
};

export const initialCustomerInfo: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  pickupDate: "",
  pickupTime: "",
};
