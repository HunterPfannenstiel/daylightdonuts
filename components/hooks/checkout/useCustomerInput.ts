import {
  CustomerFormInfo,
  CustomerInfo,
  CustomerOrderInfo,
  FormLocationDetails,
  OrderLocationDetails,
} from "@_types/database/checkout";
import { useEffect, useRef, useState } from "react";
import { postOptimisticOrder } from "@_utils/payment/stripe";
import { UserInfo } from "@_types/database/userInfo";
import { useAuth } from "@_providers/UserInfo/UserInfo";

//A hook used to group/manage all of the customer's input which is forwarded by the Customer Info context
const useCustomerInput = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerFormInfo>(
    getInitialCustomerInfo()
  );
  const [locationDetails, setLocationDetails] = useState<FormLocationDetails>(
    getInitialTimeDetails()
  );
  const { infos, favorite_id, email, isLoading } = useAuth();
  const [selectedInfoId, setSelectedInfoId] = useState(-1);

  useEffect(() => {
    if (infos && infos.length && selectedInfoId === -1) {
      console.log(email);
      const id = favorite_id || infos[0].id;
      setSelectedInfoId(id);
      setCustomerInfo(getSelectedInfo(infos, email!, id)!);
    }
  }, [infos]);
  const postOrder = () => {
    let info: CustomerInfo;
    const currInfo = getCustomerOrderInfo(customerInfo);
    const locationInfo = getLocationInfo(locationDetails);
    console.log(locationInfo);
    if (selectedInfoId === -1) {
      info = {
        customerInfo: true,
        customerOrderInfo: currInfo,
        userInfoId: null,
        ...locationInfo,
      };
    } else {
      const userInfo = getCustomerOrderInfo(
        getSelectedInfo(infos!, email!, selectedInfoId)!
      );
      if (isInfoModified(userInfo, currInfo)) {
        info = {
          customerInfo: true,
          customerOrderInfo: currInfo,
          userInfoId: null,
          ...locationInfo,
        };
      } else {
        info = {
          customerInfo: false,
          userInfoId: selectedInfoId,
          customerOrderInfo: null,
          ...locationInfo,
        };
      }
    }
    console.log(info);
    // return new Promise<void>((resolve, reject) => reject("Testing"));
    return postOptimisticOrder(info);
  };

  const updateCustomerInfo = (key: keyof CustomerFormInfo, value: string) => {
    setCustomerInfo((prevInfo) => {
      return { ...prevInfo, [key]: { value, isValid: true } };
    });
  };
  const updateLocationInfo = (
    key: keyof OrderLocationDetails,
    value: string
  ) => {
    console.log(key, value);
    setLocationDetails((prevInfo) => ({
      ...prevInfo,
      [key]: { value, isValid: true },
    }));
  };

  const setInfoId = (id: number) => {
    setSelectedInfoId(id);
    setCustomerInfo(getSelectedInfo(infos!, email!, id)!);
  };

  return {
    customerInfo,
    locationDetails,
    updateLocationInfo,
    setSelectedInfoId,
    postOrder,
    updateCustomerInfo,
    setInfoId,
    isLoading,
  };
};

export default useCustomerInput;

const isInfoModified = (
  selectedUserInfo: CustomerOrderInfo | undefined,
  currentInput: CustomerOrderInfo
) => {
  if (!selectedUserInfo) return true;
  if (selectedUserInfo["first_name"] !== currentInput.first_name) return true;
  if (selectedUserInfo["last_name"] !== currentInput.last_name) return true;
  if (selectedUserInfo["phone_number"] !== currentInput.phone_number)
    return true;
  if (selectedUserInfo.email !== currentInput.email) return true;
};

const getSelectedInfo = (
  infos: UserInfo[],
  email: string,
  id: number
): CustomerFormInfo | undefined => {
  const info = infos.find((info) => info.id === id);
  if (info) {
    return {
      first_name: { value: info.first_name, isValid: true },
      last_name: { value: info.last_name, isValid: true },
      email: { value: email, isValid: true },
      phone_number: { value: info.phone_number, isValid: true },
    };
  }
};

const getCustomerOrderInfo = (info: CustomerFormInfo) => {
  const first_name = info.first_name.value;
  const last_name = info.last_name.value;
  const phone_number = info.phone_number.value;
  const email = info.email.value;
  return { first_name, last_name, phone_number, email };
};

const getInitialCustomerInfo = (): CustomerFormInfo => {
  return {
    first_name: { value: "", isValid: true },
    last_name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone_number: { value: "", isValid: true },
  };
};

const getInitialTimeDetails = (): FormLocationDetails => {
  return {
    locationId: { value: "", isValid: true },
    pickupDate: { value: "", isValid: true },
    pickupTimeId: { value: "", isValid: true },
  };
};

const getLocationInfo = (
  locationDetails: FormLocationDetails
): OrderLocationDetails => {
  const locationId = locationDetails.locationId.value;
  const pickupTimeId = locationDetails.pickupTimeId.value;
  const pickupDate = locationDetails.pickupDate.value;
  return { locationId, pickupTimeId, pickupDate };
};
