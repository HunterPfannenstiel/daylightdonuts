import { CustomerInfo } from "@_types/payment";
import CalendarIcon from "components/ui/svg/CalendarIcon";
import { ChangeEvent, FunctionComponent } from "react";
import Calendar from "../Calendar";
import classes from "./PickupInfo.module.css";
import TimeSelect from "./TimeSelect";

interface PickupInfoProps {
  customerInfo: CustomerInfo;
}

const PickupInfo: FunctionComponent<PickupInfoProps> = ({ customerInfo }) => {
  const handleCustomerInfo = (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof CustomerInfo
  ) => {
    customerInfo[keyName] = e.target.value;
  };
  return (
    <>
      <div className={classes.info}>
        <div className={classes.location}>
          <label htmlFor="location">Location:</label>
          <select
            name="location"
            id="location"
            onChange={(e) => {
              handleCustomerInfo(e, "location");
            }}
            required
          >
            <option value="" disabled selected>
              Select a location
            </option>
            <option>1435 East 30th Avenue</option>
          </select>
        </div>
        <div className={classes.time}>
          <label htmlFor="time">Time:</label>
          <TimeSelect handleCustomerInfo={handleCustomerInfo} />
        </div>
        <div className={classes.date}>
          <label htmlFor="date">Date:</label>
          <Calendar customerInfo={customerInfo} />
          {/* <CalendarIcon /> */}
        </div>
      </div>
    </>
  );
};

export default PickupInfo;
