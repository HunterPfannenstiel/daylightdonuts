import { CustomerInfo } from "@_types/payment";
import { ChangeEvent, FunctionComponent } from "react";
import classes from "./TimeSelect.module.css";

interface TimeSelectProps {
  handleCustomerInfo: (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof CustomerInfo
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
        handleCustomerInfo(e, "pickupTime");
      }}
      placeholder="Select a time"
      required
    >
      <option value="" disabled selected>
        Select a time
      </option>
      <option value="5:00">5:00 am</option>
      <option value="5:30">5:30 am</option>
      <option value="6:00">6:00 am</option>
      <option value="6:30">6:30 am</option>
      <option value="7:00">7:00 am</option>
      <option value="7:30">7:30 am</option>
      <option value="8:00">8:00 am</option>
      <option value="8:30">8:30 am</option>
      <option value="9:00">9:00 am</option>
      <option value="9:30">9:30 am</option>
      <option value="10:00">10:00 am</option>
      <option value="10:30">10:30 am</option>
      <option value="11:00">11:00 am</option>
      <option value="11:30">11:30 am</option>
    </select>
  );
};

export default TimeSelect;
