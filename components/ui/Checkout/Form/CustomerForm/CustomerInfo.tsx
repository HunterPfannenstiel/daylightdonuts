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
            updateCustomerInfo(e, "phone");
          }}
        />
      </div>
      <PickupInfo customerInfo={customerInfo} />
    </Fieldset>
  );
};

export default CustomerInfo;
