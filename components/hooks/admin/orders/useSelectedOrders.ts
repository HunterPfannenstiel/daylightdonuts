import { LabelBlock, OrderLabelDetails } from "@_types/admin/orders";
import { useRef, useState } from "react";

const useSelectedOrders = () => {
  const selectedOrders = useRef<{
    [orderId: number]: {
      labelBlocks: LabelBlock[];
      details: OrderLabelDetails;
    };
  }>({});
  const [selectedCount, setSelectedCount] = useState(0);

  const updateSelectedOrder = (
    orderId: number,
    details?: OrderLabelDetails,
    labelBlocks?: LabelBlock[]
  ) => {
    if (!labelBlocks) {
      setSelectedCount((prevState) => prevState - 1);
      delete selectedOrders.current[orderId];
    } else {
      if (!selectedOrders.current[orderId] && details) {
        setSelectedCount((prevState) => prevState + 1);
        selectedOrders.current[orderId] = { labelBlocks, details };
      }
      selectedOrders.current[orderId] = {
        ...selectedOrders.current[orderId],
        labelBlocks,
      };
    }
  };

  const getLabelsToPrint = () => {
    return Object.keys(selectedOrders.current).map((key) => {
      return selectedOrders.current[+key];
    });
  };

  return { updateSelectedOrder, getLabelsToPrint, selectedCount };
};

export default useSelectedOrders;
