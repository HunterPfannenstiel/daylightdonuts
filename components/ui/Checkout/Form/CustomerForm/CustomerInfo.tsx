import { CustomerFormInfo } from "@_types/database/checkout";
import { ChangeEvent, FunctionComponent } from "react";
import Fieldset from "../Fieldset";
import classes from "./CustomerInfo.module.css";
import Input from "./Input";
import PickupInfo from "./PickupInfo/PickupInfo";
import { useCheckoutInfo } from "@_providers/Checkout/CustomerInfo";

interface CustomerInfoProps {}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = () => {
  const {
    customerFormInfo,
    orderTimeDetails,
    currentStoreTimes,
    locations,
    setSelectedLocationId,
  } = useCheckoutInfo();
  const updateCustomerInfo = (
    e: ChangeEvent<HTMLInputElement>,
    keyName: keyof CustomerFormInfo
  ) => {
    customerFormInfo[keyName] = e.target.value;
  };

  return (
    <Fieldset title="Pickup Details" className={classes.fieldset}>
      <div className={classes.name}>
        <Input
          keyName="firstName"
          placeholder="First name"
          label="Name of person collecting"
          required
          onChange={(e) => {
            updateCustomerInfo(e, "first_name");
          }}
        />
        <Input
          keyName="lastName"
          placeholder="Last name"
          label="Name of person collecting"
          required
          onChange={(e) => {
            updateCustomerInfo(e, "last_name");
          }}
        />
      </div>
      <div className={classes.contact}>
        <Input
          keyName="email"
          placeholder="riseandshine@daylight.com"
          label="Contact Email"
          type="email"
          required
          onChange={(e) => {
            updateCustomerInfo(e, "email");
          }}
        />
        <Input
          keyName="phone"
          placeholder="###-####-####"
          label="Contact Phone #"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          onChange={(e) => {
            e.target.value = addDashes(e.target.value);
            updateCustomerInfo(e, "phone_number");
          }}
        />
      </div>
      <PickupInfo
        orderTimeDetails={orderTimeDetails}
        locationTimes={currentStoreTimes}
        locations={locations}
        setSelectedLocationId={setSelectedLocationId}
      />
    </Fieldset>
  );
};

const addDashes = (phoneNumber: string) => {
  let cleanNumber = phoneNumber.replace(/\D[-]/g, "");
  if (cleanNumber.length >= 12) {
    return cleanNumber.slice(0, 12);
  }
  if (cleanNumber.length === 4 && cleanNumber[3] !== "-") {
    return cleanNumber.slice(0, 3) + "-" + cleanNumber.slice(3);
  } else if (cleanNumber.length === 8 && cleanNumber[7] !== "-") {
    return cleanNumber.slice(0, 7) + "-" + cleanNumber.slice(7);
  }
  return cleanNumber;
};

export default CustomerInfo;
