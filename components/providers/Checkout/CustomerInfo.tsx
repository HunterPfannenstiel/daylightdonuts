import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CustomerFormInfo,
  CustomerInfo,
  LocationTimes,
  OrderTimeDetails,
} from "@_types/database/checkout";
import {
  getInitialContext,
  getInitialCustomerInfo,
  getInitialTimeDetails,
} from "./utils";
import usePickupInfo from "@_hooks/checkout/usePickupInfo";
import { postOptimisticOrder } from "@_utils/payment/stripe";

const CheckoutInfo = createContext(getInitialContext());

//A global context that will persist the checkout form info. If the user filled out the form but forgot an item, the form will remain filled in
const CheckoutInfoProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<number>();
  const currentStoreTimes = useRef<LocationTimes>();
  const customerInfo = useRef<CustomerFormInfo>(getInitialCustomerInfo());
  const orderTimeDetails = useRef<OrderTimeDetails>(getInitialTimeDetails());
  const { data } = usePickupInfo(setSelectedLocationId); //This will set the locationId to the first location id in the fecthed info and return all locations
  const postOrder = () => {
    if (customerInfo.current.userInfoId) {
      const info: CustomerInfo = {
        customerInfo: false,
        userInfoId: +customerInfo.current.userInfoId,
        customerOrderInfo: null,
        ...orderTimeDetails.current,
      };
      return postOptimisticOrder(info);
    } else {
      const info: CustomerInfo = {
        customerInfo: true,
        customerOrderInfo: customerInfo.current,
        userInfoId: null,
        ...orderTimeDetails.current,
      };
      return postOptimisticOrder(info);
    }
  };
  useEffect(() => {
    if (selectedLocationId) {
      const index = data?.findIndex(
        (info) => info.location_id === selectedLocationId
      );
      if (index && index !== -1) {
        currentStoreTimes.current = data![index].times;
      }
    }
  }, [selectedLocationId]); //If the selectedLocationId changes, update the current store times
  return (
    <CheckoutInfo.Provider
      value={{
        customerFormInfo: customerInfo.current,
        orderTimeDetails: orderTimeDetails.current,
        setSelectedLocationId,
        currentStoreTimes: currentStoreTimes.current,
        locations: data,
        postOrder,
      }}
    >
      {children}
    </CheckoutInfo.Provider>
  );
};

export default CheckoutInfoProvider;

export const useCheckoutInfo = () => {
  return useContext(CheckoutInfo);
};
