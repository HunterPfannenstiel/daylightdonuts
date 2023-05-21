import {
  LocationDetails,
  LocationTimes,
  OrderTimeDetails,
} from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import Calendar from "../Calendar";
import classes from "./PickupInfo.module.css";
import TimeSelect from "./TimeSelect";
import usePickupInfo from "@_hooks/checkout/usePickupInfo";

interface PickupInfoProps {
  orderTimeDetails: OrderTimeDetails;
}

const PickupInfo: FunctionComponent<PickupInfoProps> = ({
  orderTimeDetails,
}) => {
  const { data, isLoading, isError } = usePickupInfo(orderTimeDetails);
  const [selectStoreTimes, setSelectedStoreTimes] = useState<LocationTimes>();
  if (isLoading) return <h1>Show Loading</h1>;
  if (isError) return <h1>error</h1>;
  const handleCustomerInfo = (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof OrderTimeDetails
  ) => {
    orderTimeDetails[keyName] = e.target.value;
  };

  useEffect(() => {
    console.log("Change");
    const index = data?.findIndex(
      (info) => info.location_id.toString() === orderTimeDetails["locationId"]
    );
    if (index && index !== -1) {
      setSelectedStoreTimes(data![index].times);
    }
  }, [orderTimeDetails["locationId"]]);
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
            {data!.map((info) => {
              return (
                <option value={info.location_id}>{info.common_name}</option>
              );
            })}
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
