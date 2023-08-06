import {
  CustomerFormInfo,
  CustomerInfo,
  CustomerOrderInfo,
  FormLocationDetails,
} from "@_types/database/checkout";
import { useEffect, useState } from "react";
import { postOptimisticOrder } from "@_utils/payment/stripe";
import { UserInfo } from "@_types/database/userInfo";
import { useAuth } from "@_providers/UserInfo/UserInfo";
import { isValidClientEmail, isValidClientPhone } from "@_utils/payment/form";
import useValidateInput from "@_hooks/form/useValidateInput";

//A hook used to group/manage all of the customer's input which is forwarded by the Customer Info context
const useCustomerInput = () => {
  const [formInput, { update: updateInfo, set: setInfo }] = useValidateInput([
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "locationId",
    "pickupDate",
    "pickupTimeId",
  ]);
  const { infos, favorite_id, email, isLoading } = useAuth();
  const [selectedInfoId, setSelectedInfoId] = useState(-1);

  useEffect(() => {
    if (infos && infos.length && selectedInfoId === -1) {
      const id = favorite_id || infos[0].id;
      setSelectedInfoId(id);
      setInfo(getSelectedInfo(infos, email!, id)!);
    }
  }, [infos]);
  const postOrder = () => {
    let info: CustomerInfo;
    const currInfo = getCustomerOrderInfo(formInput);
    const locationInfo = {
      locationId: formInput.locationId.value,
      pickupTimeId: formInput.pickupTimeId.value,
      pickupDate: formInput.pickupDate.value,
    };
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
    // return new Promise<void>((resolve, reject) => reject("Testing"));
    return postOptimisticOrder(info);
  };

  const setInfoId = (id: number) => {
    setSelectedInfoId(id);
    setInfo(getSelectedInfo(infos!, email!, id)!);
  };

  const validateCustomerInfo = () => {
    let key: keyof (CustomerFormInfo & FormLocationDetails) | undefined;
    if (!isValidClientEmail(formInput.email.value)) {
      key = "email";
    } else if (!isValidClientPhone(formInput.phone_number.value)) {
      key = "phone_number";
    } else if (!formInput.first_name.value) key = "first_name";
    else if (!formInput.last_name.value) key = "last_name";
    else if (!formInput.locationId.value) key = "locationId";
    else if (!formInput.pickupDate.value) key = "pickupDate";
    else if (!formInput.pickupTimeId.value) key = "pickupTimeId";
    if (key) {
      console.log(key);
      updateInfo(key, formInput[key].value, false);
      return false;
    }
    return true;
  };

  const getCustomerInfo = (): CustomerFormInfo => {
    return {
      first_name: formInput.first_name,
      last_name: formInput.last_name,
      phone_number: formInput.phone_number,
      email: formInput.email,
    };
  };
  const getLocationInfo = (): FormLocationDetails => {
    return {
      locationId: formInput.locationId,
      pickupDate: formInput.pickupDate,
      pickupTimeId: formInput.pickupTimeId,
    };
  };

  return {
    formInput,
    setSelectedInfoId,
    postOrder,
    updateFormInfo: updateInfo,
    setInfoId,
    isLoading,
    validateCustomerInfo,
    getCustomerInfo,
    getLocationInfo,
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
