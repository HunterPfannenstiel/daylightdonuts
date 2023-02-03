import { FunctionComponent } from "react";
import IPageDisplay from "../Reusable/PageDisplay/IPageDisplay";
import classes from "./OrderDisplay.module.css";
import OrderItemList from "./OrderItem/OrderItemList";
import AdminBack from "components/ui/svg/AdminBack";
import Refresh from "components/ui/svg/Refresh";
import useOrders from "@_hooks/admin/orders/useOrders";
import { Interval, IntervalButton } from "@_types/admin/orders";
import DateSelect from "../Reusable/DateSelect/DateSelect";

interface OrderDisplayProps {}

const OrderDisplay: FunctionComponent<OrderDisplayProps> = () => {
  const { orders, setInterval, setPickerRange } = useOrders();
  const intervalChange = (interval: Interval) => {
    setInterval(interval);
  };
  return (
    <>
      <IPageDisplay
        title="Orders"
        leftIcon={<AdminBack />}
        rightIcon={<Refresh />}
        className={classes.page_display}
      >
        {/* <DateFilter intervalChange={intervalChange} /> */}
        <OrderItemList orders={orders} />
      </IPageDisplay>
      <DateSelect
        relativeButtons={relativeButtons}
        relativeIntervalChange={intervalChange}
        absoluteIntervalChange={setPickerRange}
      />
    </>
  );
};

const relativeButtons: IntervalButton<Interval>[] = [
  {
    label: "Today",
    onClick: (intervalChange) => {
      intervalChange("Day");
    },
  },
  {
    label: "This Week",
    onClick: (intervalChange) => {
      intervalChange("Week");
    },
  },
  {
    label: "This Month",
    onClick: (intervalChange) => {
      intervalChange("Month");
    },
  },
  {
    label: "This Year",
    onClick: (intervalChange) => {
      intervalChange("Year");
    },
  },
];

export default OrderDisplay;
