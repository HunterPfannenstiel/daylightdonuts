import { OrderTimeDetails } from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent } from "react";
import Calendar from "../Calendar";
import classes from "./PickupInfo.module.css";
import TimeSelect from "./TimeSelect";

interface PickupInfoProps {
  orderTimeDetails: OrderTimeDetails;
}

const PickupInfo: FunctionComponent<PickupInfoProps> = ({
  orderTimeDetails,
}) => {
  const handleCustomerInfo = (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof OrderTimeDetails
  ) => {
    orderTimeDetails[keyName] = e.target.value;
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
              handleCustomerInfo(e, "locationId");
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
          <Calendar orderTimeDetails={orderTimeDetails} />
          {/* <CalendarIcon /> */}
        </div>
      </div>
    </>
  );
};

export default PickupInfo;
