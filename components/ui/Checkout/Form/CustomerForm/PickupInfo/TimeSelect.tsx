import { LocationTimes, OrderTimeDetails } from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent } from "react";
import classes from "./TimeSelect.module.css";

interface TimeSelectProps {
  handleCustomerInfo: (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof OrderTimeDetails
  ) => void;
  locationTimes: LocationTimes | undefined;
}

const TimeSelect: FunctionComponent<TimeSelectProps> = ({
  handleCustomerInfo,
  locationTimes,
}) => {
  return (
    <select
      name="time"
      id="time"
      onChange={(e) => {
        handleCustomerInfo(e, "pickupTimeId");
      }}
      placeholder="Select a time"
      required
    >
      {locationTimes?.map((time) => {
        return <option value={time.id}>{time.time}</option>;
      })}
    </select>
  );
};

export default TimeSelect;
