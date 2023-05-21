import {
  CustomerFormInfo,
  LocationDetails,
  LocationTimes,
  OrderTimeDetails,
} from "@_types/database/checkout";

export type CustomerInfoContext = {
  setSelectedLocationId: (locationId: number) => void;
  locations: LocationDetails[] | undefined;
  postOrder: () => Promise<void>;
  currentStoreTimes: LocationTimes | undefined;
  customerFormInfo: CustomerFormInfo;
  orderTimeDetails: OrderTimeDetails;
};

export const getInitialContext = (): CustomerInfoContext => {
  return {
    customerFormInfo: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
    orderTimeDetails: {
      locationId: "",
      pickupDate: "",
      pickupTimeId: "",
    },
    locations: undefined,
    setSelectedLocationId: () => {},
    currentStoreTimes: undefined,
    postOrder: () => new Promise((resolve) => resolve()),
  };
};

export const getInitialCustomerInfo = (): CustomerFormInfo => {
  return {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  };
};

export const getInitialTimeDetails = (): OrderTimeDetails => {
  return {
    locationId: "",
    pickupDate: "",
    pickupTimeId: "",
  };
};
