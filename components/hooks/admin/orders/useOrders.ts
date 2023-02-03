import { useQuery } from "@tanstack/react-query";
import { DateRange, DBOrder, Interval } from "@_types/admin/orders";
import useDateRange from "../useDateRange";

const useOrders = () => {
  const { dateRange, setInterval, setPickerRange } =
    useDateRange<Interval>("Day");
  const { data, isLoading, isError } = useQuery(
    ["orders", dateRange],
    fetchOrders.bind(null, dateRange)
  );

  return {
    orders: data,
    isLoading,
    isError,
    setPickerRange,
    setInterval,
  };
};

const fetchOrders = async (dateRange: DateRange) => {
  const res = await fetch(
    `/api/admin/orders?start=${dateRange.startDate}&end=${dateRange.endDate}`
  );
  const data = await res.json();
  if (res.ok) {
    console.log(data);
    return data as DBOrder[];
  } else {
    throw new Error(data.message);
  }
};

export default useOrders;
