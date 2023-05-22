import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LocationTimes } from "@_types/database/checkout";
import { getInitialContext } from "./utils";
import usePickupInfo from "@_hooks/checkout/usePickupInfo";
import useCustomerInput from "./hooks/useCustomerInput";

const CheckoutInfo = createContext(getInitialContext());

//A global context that will persist the checkout form info. If the user filled out the form but forgot an item, the form will remain filled in
const CheckoutInfoProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const customerInput = useCustomerInput(); //Stores the refs used to manage the customer input and is also responsible for sending the correct data when creating an order
  const [selectedLocationId, setSelectedLocationId] = useState<number>();
  const currentStoreTimes = useRef<LocationTimes>();
  const changeSelectedLocationId = (locationId: number) => {
    const index = data?.findIndex((info) => info.location_id === locationId);
    if ((index && index !== -1) || index === 0) {
      currentStoreTimes.current = data![index].times;
      customerInput.orderTimeDetails.pickupTimeId =
        currentStoreTimes.current[0].id.toString();
      setSelectedLocationId(locationId);
    }
  };
  const { data } = usePickupInfo(changeSelectedLocationId); //This will set the locationId to the first location id in the fecthed info and return all locations
  return (
    <CheckoutInfo.Provider
      value={{
        customerFormInfo: customerInput.customerInfo,
        orderTimeDetails: customerInput.orderTimeDetails,
        setSelectedLocationId: changeSelectedLocationId,
        setSelectedInfoId: customerInput.setSelectedInfoId,
        initializeUserInfo: customerInput.initializeUserInfo,
        currentStoreTimes: currentStoreTimes.current,
        locations: data,
        postOrder: customerInput.postOrder,
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
