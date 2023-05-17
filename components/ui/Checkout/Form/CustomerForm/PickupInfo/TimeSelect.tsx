import { OrderTimeDetails } from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent } from "react";
import classes from "./TimeSelect.module.css";

interface TimeSelectProps {
  handleCustomerInfo: (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof OrderTimeDetails
  ) => void;
}

const TimeSelect: FunctionComponent<TimeSelectProps> = ({
  handleCustomerInfo,
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
      <option value="" disabled selected>
        Select a time
      </option>
      <option value="1">5:00 am</option>
      <option value="2">5:30 am</option>
      <option value="3">6:00 am</option>
      <option value="4">6:30 am</option>
      <option value="5">7:00 am</option>
      <option value="6">7:30 am</option>
      <option value="7">8:00 am</option>
      <option value="8">8:30 am</option>
      <option value="9">9:00 am</option>
      <option value="10">9:30 am</option>
      <option value="11">10:00 am</option>
      <option value="12">10:30 am</option>
      <option value="13">11:00 am</option>
      <option value="14">11:30 am</option>
    </select>
  );
};

export default TimeSelect;
