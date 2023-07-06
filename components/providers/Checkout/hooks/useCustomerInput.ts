import {
  CustomerFormInfo,
  CustomerInfo,
  OrderTimeDetails,
} from "@_types/database/checkout";
import { useEffect, useRef, useState } from "react";
import { getInitialCustomerInfo, getInitialTimeDetails } from "../utils";
import { postOptimisticOrder } from "@_utils/payment/stripe";
import { UserInfo } from "@_types/database/userInfo";

//A hook used to group/manage all of the customer's input which is forwarded by the Customer Info context
const useCustomerInput = () => {
  const customerInfo = useRef<CustomerFormInfo>(getInitialCustomerInfo());
  const orderTimeDetails = useRef<OrderTimeDetails>(getInitialTimeDetails());
  const userInfos = useRef<UserInfo[]>();
  const userEmail = useRef<string>();
  const [selectedInfoId, setSelectedInfoId] = useState(-1);

  const postOrder = (selectedUserInfo?: UserInfo) => {
    let info: CustomerInfo;
    if (!selectedInfoId) {
      info = {
        customerInfo: true,
        customerOrderInfo: customerInfo.current,
        userInfoId: null,
        ...orderTimeDetails.current,
      };
    } else {
      if (
        isInfoModified(
          selectedUserInfo,
          customerInfo.current,
          userEmail.current
        )
      ) {
        info = {
          customerInfo: true,
          customerOrderInfo: customerInfo.current,
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
    customerInfo.current[key] = value;
    console.log(customerInfo.current);
  };

  const initializeUserInfo = (
    info: UserInfo[],
    selectedId: number,
    email: string
  ) => {
    userInfos.current = info;
    userEmail.current = email;
    setSelectedInfoId(selectedId);
  };

  const setInfoId = (id: number) => {};

  useEffect(() => {
    if (userInfos.current) {
      const selectedInfo = userInfos.current.find(
        (info) => info.id === selectedInfoId
      )!;
      customerInfo.current = { ...selectedInfo, email: userEmail.current! };
    }
  }, [selectedInfoId]);

  return {
    customerInfo: customerInfo.current,
    orderTimeDetails: orderTimeDetails.current,
    setSelectedInfoId,
    initializeUserInfo,
    postOrder,
    updateCustomerInfo,
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
