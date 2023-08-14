import { DBEntity } from "@_types/admin/modify-menu";
import { ValidatedInput } from "@_hooks/form/useValidateInput";

//Checkout
export type CheckoutInfo = {
  locations: Location[];
  pickup_times: PickupTime[];
};

export type Location = {
  location_id: number;
  city: string;
  state: string;
  zip: string;
  address: string;
  common_name: string;
  phone_number: string;
};

export type PickupTime = {
  pickup_time_id: number;
  pickup_time: string;
};
//End of Checkout

//Cart
export type CartAvailability = {
  available_weekdays: string[] | null;
  available_daterange: DateRange[] | null;
};

export type DateRange = {
  menu_item_id: number;
  range: string[2];
};
//End of Cart

export type TotalCart = {
  price: string | null;
  size: number | null;
  //holds the unit price along with the amount of items with that price (a grouping could have multiple items with different unitprices)
  items: [string, number][];
  total_items: number;
};

export type CustomerFormInfo = {
  first_name: ValidatedInput;
  last_name: ValidatedInput;
  email: ValidatedInput;
  phone_number: ValidatedInput;
};

export type FormLocationDetails = {
  locationId: ValidatedInput;
  pickupDate: ValidatedInput;
  pickupTimeId: ValidatedInput;
};

export type CustomerOrderInfo = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type OrderLocationDetails = {
  locationId: string;
  pickupDate: string;
  pickupTimeId: string;
};

export type CustomerInfo =
  | ({
      customerInfo: true;
      customerOrderInfo: CustomerOrderInfo;
      userInfoId: null;
    } & OrderLocationDetails)
  | ({
      customerInfo: false;
      customerOrderInfo: null;
      userInfoId: number;
    } & OrderLocationDetails);

export const initialCustomerInfo: CustomerFormInfo = {
  first_name: { value: "", isValid: true },
  last_name: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone_number: { value: "", isValid: true },
};

export const initialOrderTimeDetails: FormLocationDetails = {
  locationId: { value: "", isValid: true },
  pickupDate: { value: "", isValid: true },
  pickupTimeId: { value: "", isValid: true },
};

export type LocationDetails = {
  common_name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone_number: string;
  location_id: number;
  times: DBEntity[];
};

export type CreateOrder = {
  cartId: number;
} & CustomerInfo;
