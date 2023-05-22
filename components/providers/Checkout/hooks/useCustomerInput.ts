import {
  CustomerFormInfo,
  CustomerInfo,
  OrderTimeDetails,
  UserInfo,
} from "@_types/database/checkout";
import { useEffect, useRef, useState } from "react";
import { getInitialCustomerInfo, getInitialTimeDetails } from "../utils";
import { postOptimisticOrder } from "@_utils/payment/stripe";

//A hook used to group/manage all of the customer's input which is forwarded by the Customer Info context
const useCustomerInput = () => {
  const customerInfo = useRef<CustomerFormInfo>(getInitialCustomerInfo());
  const orderTimeDetails = useRef<OrderTimeDetails>(getInitialTimeDetails());
  const userInfos = useRef<UserInfo[]>();
  const [selectedInfoId, setSelectedInfoId] = useState(-1);

  const postOrder = () => {
    let info: CustomerInfo;
    if (selectedInfoId === -1) {
      info = {
        customerInfo: true,
        customerOrderInfo: customerInfo.current,
        userInfoId: null,
        ...orderTimeDetails.current,
      };
    } else {
      const selectedUserInfo = userInfos.current?.find(
        (info) => info.user_info_id === selectedInfoId
      );
      if (isInfoModified(selectedUserInfo, customerInfo.current)) {
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
    return new Promise<void>((resolve, reject) => reject("Testing"));
    // return postOptimisticOrder(info);
  };

  const initializeUserInfo = (info: UserInfo[], selectedId: number) => {
    userInfos.current = info;
    setSelectedInfoId(selectedId);
  };

  useEffect(() => {
    if (userInfos.current) {
      const selectedInfo = userInfos.current.find(
        (info) => info.user_info_id === selectedInfoId
      )!;
      customerInfo.current = { ...selectedInfo };
    }
  }, [selectedInfoId]);

  return {
    customerInfo: customerInfo.current,
    orderTimeDetails: orderTimeDetails.current,
    setSelectedInfoId,
    initializeUserInfo,
    postOrder,
  };
};

export default useCustomerInput;

const isInfoModified = (
  selectedUserInfo: UserInfo | undefined,
  currentCustomerInfo: CustomerFormInfo
) => {
  if (!selectedUserInfo) return true;
  if (selectedUserInfo["first_name"] !== currentCustomerInfo["first_name"])
    return true;
  if (selectedUserInfo["last_name"] !== currentCustomerInfo["last_name"])
    return true;
  if (selectedUserInfo["phone_number"] !== currentCustomerInfo["phone_number"])
    return true;
  if (selectedUserInfo["email"] !== currentCustomerInfo["email"]) return true;
};
