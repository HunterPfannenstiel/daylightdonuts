import { LabelSection, OrderLabelDetails } from "@_types/admin/orders";
import { buildLabelBlocks, getLabel } from "@_utils/dymo/format";
import { useRef, useState } from "react";

const useSelectedOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState<{
    [orderId: number]: any;
  }>({});
  const selectedOrderInfo = useRef<{
    [orderId: number]: {
      details: OrderLabelDetails;
      labelSections: LabelSection[];
      abbreviate: boolean;
      showCategoryNames: boolean;
    };
  }>({}); //Used to store the information that was used to build the label so if the text needs reformating, we have the details to do so
  const [selectedCount, setSelectedCount] = useState(0);

  const updateSelectedOrder = (
    orderId: number,
    details?: OrderLabelDetails,
    labelSections?: LabelSection[],
    abbreviate = false,
    showCategoryNames = false
  ) => {
    if (!labelSections) {
      setSelectedCount((prevState) => prevState - 1);
      delete selectedOrderInfo.current[orderId];
      setSelectedOrders((prevState) => {
        const copyState = { ...prevState };
        delete copyState[orderId];
        return copyState;
      });
    } else {
      if (!selectedOrders[orderId] && details) {
        setSelectedCount((prevState) => prevState + 1);
        selectedOrderInfo.current[orderId] = {
          details,
          labelSections,
          abbreviate,
          showCategoryNames,
        };
        const labelBlocks = buildLabelBlocks(
          labelSections,
          abbreviate,
          showCategoryNames
        );
        const label = getLabel(
          details.storeName,
          details.customerName,
          details.date,
          details.time,
          labelBlocks,
          details.detailMessage
        );
        setSelectedOrders((prevState) => {
          const copyState = { ...prevState };
          copyState[orderId] = label;
          return copyState;
        });
      } else if (details) {
        const labelBlocks = buildLabelBlocks(
          labelSections,
          abbreviate,
          showCategoryNames
        );
        const label = getLabel(
          details.storeName,
          details.customerName,
          details.date,
          details.time,
          labelBlocks,
          details.detailMessage
        );
        selectedOrderInfo.current[orderId] = {
          details,
          labelSections,
          abbreviate,
          showCategoryNames,
        };
        setSelectedOrders((prevState) => {
          const copyState = { ...prevState };
          copyState[orderId] = label;
          return copyState;
        });
      }
    }
  };

  const onTextChange = (
    orderId: number,
    style: "Full Name" | "Abbreviation",
    showCategoryNames: boolean
  ) => {
    const { labelSections, details } = selectedOrderInfo.current[orderId];
    updateSelectedOrder(
      orderId,
      details,
      labelSections,
      style === "Abbreviation",
      showCategoryNames
    );
  };

  return {
    selectedOrders,
    updateSelectedOrder,
    selectedCount,
    onTextChange,
    selectedOrderInfo,
  };
};

export default useSelectedOrders;
