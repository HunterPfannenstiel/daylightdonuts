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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type OrderTimeDetails = {
  locationId: string;
  pickupDate: string;
  pickupTimeId: string;
};

export type CustomerInfo =
  | ({
      customerInfo: true;
      customerOrderInfo: CustomerFormInfo;
      accountId: null;
      userInfoId: null;
    } & OrderTimeDetails)
  | ({
      customerInfo: false;
      customerOrderInfo: null;
      accountId: number;
      userInfoId: number;
    } & OrderTimeDetails);

export const initialCustomerInfo: CustomerFormInfo = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};

export const initialOrderTimeDetails: OrderTimeDetails = {
  locationId: "",
  pickupDate: "",
  pickupTimeId: "",
};

export type LocationDetails = {
  common_name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone_number: string;
  location_id: number;
  times: LocationTimes;
};

export type LocationTimes = { time: string; id: number }[];

export type CreateOrder = {
  cartId: number;
} & CustomerInfo;
