import {
  CustomerFormInfo,
  CustomerInfo,
  OrderTimeDetails,
} from "@_types/database/checkout";
import { useRef, useState } from "react";
import { getInitialCustomerInfo, getInitialTimeDetails } from "../utils";
import { postOptimisticOrder } from "@_utils/payment/stripe";
import { UserInfo } from "@_types/database/userInfo";

//A hook used to group/manage all of the customer's input which is forwarded by the Customer Info context
const useCustomerInput = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerFormInfo>(
    getInitialCustomerInfo()
  );
  const orderTimeDetails = useRef<OrderTimeDetails>(getInitialTimeDetails());
  const userInfos = useRef<UserInfo[]>();
  const userEmail = useRef<string>();
  const [selectedInfoId, setSelectedInfoId] = useState(-1);

  const postOrder = (selectedUserInfo?: UserInfo) => {
    let info: CustomerInfo;
    if (!selectedInfoId) {
      info = {
        customerInfo: true,
        customerOrderInfo: customerInfo,
        userInfoId: null,
        ...orderTimeDetails.current,
      };
    } else {
      if (isInfoModified(selectedUserInfo, customerInfo, userEmail.current)) {
        info = {
          customerInfo: true,
          customerOrderInfo: customerInfo,
          userInfoId: null,
          ...orderTimeDetails.current,
        };
      } else {
        info = {
          customerInfo: false,
          userInfoId: selectedInfoId,
          customerOrderInfo: null,
          ...orderTimeDetails.current,
        };
      }
    }
    console.log(info);
    // return new Promise<void>((resolve, reject) => reject("Testing"));
    return postOptimisticOrder(info);
  };

  const updateCustomerInfo = (key: keyof CustomerFormInfo, value: string) => {
    setCustomerInfo((prevInfo) => {
      return { ...prevInfo, [key]: value };
    });
  };
  const initializeUserInfo = (
    infos: UserInfo[],
    selectedId: number,
    email: string
  ) => {
    console.log(infos);
    userInfos.current = infos;
    userEmail.current = email;
    console.log(selectedId);
    if (selectedId !== -1) {
      setCustomerInfo(getSelectedInfo(infos, email, selectedId)!);
    }
    setSelectedInfoId(selectedId);
  };

  const setInfoId = (id: number) => {
    setSelectedInfoId(id);
    setCustomerInfo(
      getSelectedInfo(userInfos.current!, userEmail.current!, id)!
    );
  };

  return {
    customerInfo: customerInfo,
    orderTimeDetails: orderTimeDetails.current,
    setSelectedInfoId,
    initializeUserInfo,
    postOrder,
    updateCustomerInfo,
    setInfoId,
  };
};

export default useCustomerInput;

const isInfoModified = (
  selectedUserInfo: UserInfo | undefined,
  currentCustomerInfo: CustomerFormInfo,
  email?: string
) => {
  if (!selectedUserInfo) return true;
  if (selectedUserInfo["first_name"] !== currentCustomerInfo["first_name"])
    return true;
  if (selectedUserInfo["last_name"] !== currentCustomerInfo["last_name"])
    return true;
  if (selectedUserInfo["phone_number"] !== currentCustomerInfo["phone_number"])
    return true;
  if (email !== currentCustomerInfo["email"]) return true;
};

const getSelectedInfo = (
  infos: UserInfo[],
  email: string,
  id: number
): CustomerFormInfo | undefined => {
  const info = infos.find((info) => info.id === id);
  if (info) {
    return {
      first_name: info.first_name,
      last_name: info.last_name,
      email,
      phone_number: info.phone_number,
    };
  }
};
