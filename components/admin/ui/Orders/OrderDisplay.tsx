import { FunctionComponent } from "react";
import IPageDisplay from "../Reusable/PageDisplay/IPageDisplay";
import classes from "./OrderDisplay.module.css";
import OrderItemList from "./OrderItem/OrderItemList";
import AdminBack from "components/ui/svg/AdminBack";
import Refresh from "components/ui/svg/Refresh";
import useOrders from "@_hooks/admin/orders/useOrders";
import { Interval, IntervalButton } from "@_types/admin/orders";
import DateSelect from "../Reusable/DateSelect/DateSelect";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Button from "components/ui/Reusable/Button";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";

interface OrderDisplayProps {}

const OrderDisplay: FunctionComponent<OrderDisplayProps> = () => {
  const { orders, setInterval, setPickerRange, displayRange, orderCount } =
    useOrders();
  const intervalChange = (interval: Interval) => {
    setInterval(interval);
  };
  const modal = useAnimateModal(300);
  return (
    <>
      <IPageDisplay
        title={displayRange}
        leftIcon={<AdminBack />}
        rightIcon={<Refresh />}
        className={classes.page_display}
      >
        <div className={classes.display_info}>
          <Button
            color={"var(--primary-blue)"}
            onClick={modal.handleModal}
            className={classes.button}
          >
            Set Interval
          </Button>
          <p>{`Order Count: ${orderCount}`}</p>
        </div>
        <div className={classes.orders}>
          <OrderItemList
            orders={orders}
            onSelectedForPrint={(id: number) => {
              console.log(id);
            }}
          />
        </div>
        {modal.showModal && (
          <ModalDisplay {...modal.getModalProps()}>
            <DateSelect
              relativeButtons={relativeButtons}
              relativeIntervalChange={intervalChange}
              absoluteIntervalChange={setPickerRange}
            />
          </ModalDisplay>
        )}
      </IPageDisplay>
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
