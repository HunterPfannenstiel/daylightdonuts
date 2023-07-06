import {
  CustomerFormInfo,
  LocationDetails,
  LocationTimes,
  OrderTimeDetails,
} from "@_types/database/checkout";
import { UserInfo } from "@_types/database/userInfo";

export type CustomerInfoContext = {
  setSelectedLocationId: (locationId: number) => void;
  setSelectedInfoId: (infoId: number) => void;
  initializeUserInfo: (
    info: UserInfo[],
    selectedId: number,
    email: string
  ) => void;
  locations: LocationDetails[] | undefined;
  postOrder: () => Promise<void>;
  updateCustomerInfo: (key: keyof CustomerFormInfo, value: string) => void;
  currentStoreTimes: LocationTimes | undefined;
  customerFormInfo: CustomerFormInfo;
  orderTimeDetails: OrderTimeDetails;
};

export const getInitialContext = (): CustomerInfoContext => {
  const fn = () => {};
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
    setSelectedLocationId: fn,
    setSelectedInfoId: fn,
    initializeUserInfo: fn,
    updateCustomerInfo: fn,
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
