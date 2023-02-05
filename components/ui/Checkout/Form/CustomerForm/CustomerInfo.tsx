import { CustomerInfo as Info } from "@_types/payment";
import { ChangeEvent, FunctionComponent } from "react";
import Fieldset from "../Fieldset";
import classes from "./CustomerInfo.module.css";
import Input from "./Input";
import PickupInfo from "./PickupInfo/PickupInfo";

interface CustomerInfoProps {
  customerInfo: Info;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = ({
  customerInfo,
}) => {
  const updateCustomerInfo = (
    e: ChangeEvent<HTMLInputElement>,
    keyName: keyof Info
  ) => {
    customerInfo[keyName] = e.target.value;
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
            updateCustomerInfo(e, "firstName");
          }}
        />
        <Input
          keyName="lastName"
          placeholder="Last name"
          label="Name of person collecting"
          required
          onChange={(e) => {
            updateCustomerInfo(e, "lastName");
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
            updateCustomerInfo(e, "phone");
          }}
        />
      </div>
      <PickupInfo customerInfo={customerInfo} />
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
