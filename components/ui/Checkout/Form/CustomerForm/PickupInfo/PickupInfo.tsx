import {
  LocationDetails,
  LocationTimes,
  OrderTimeDetails,
} from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import Calendar from "../Calendar";
import classes from "./PickupInfo.module.css";
import TimeSelect from "./TimeSelect";

interface PickupInfoProps {
  orderTimeDetails: OrderTimeDetails;
  locations: LocationDetails[] | undefined;
  locationTimes: LocationTimes | undefined;
  setSelectedLocationId: (locationId: number) => void;
}

const PickupInfo: FunctionComponent<PickupInfoProps> = ({
  orderTimeDetails,
  locations,
  locationTimes,
  setSelectedLocationId,
}) => {
  const handleCustomerInfo = (
    e: ChangeEvent<HTMLSelectElement>,
    keyName: keyof OrderTimeDetails
  ) => {
    orderTimeDetails[keyName] = e.target.value;
    if (keyName === "locationId") setSelectedLocationId(+e.target.value);
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
            {locations?.map((info) => {
              return (
                <option value={info.location_id} key={info.location_id}>
                  {info.common_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.time}>
          <label htmlFor="time">Time:</label>
          <TimeSelect
            handleCustomerInfo={handleCustomerInfo}
            locationTimes={locationTimes}
          />
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
