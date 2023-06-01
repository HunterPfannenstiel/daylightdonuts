import {
  CustomerFormInfo,
  LocationDetails,
  LocationTimes,
  OrderTimeDetails,
  UserInfo,
} from "@_types/database/checkout";

export type CustomerInfoContext = {
  setSelectedLocationId: (locationId: number) => void;
  setSelectedInfoId: (infoId: number) => void;
  initializeUserInfo: (info: UserInfo[], selectedId: number) => void;
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
    setSelectedInfoId: () => {},
    initializeUserInfo: () => {},
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
