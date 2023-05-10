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
