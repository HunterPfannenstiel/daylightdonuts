import { FunctionComponent } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import CheckoutTextInput from "components/ui/Reusable/Form/CheckoutTextInput";
import { CustomerFormInfo } from "@_types/database/checkout";
import Button from "components/ui/Reusable/Button";
import { InputValue } from "@_types/form";

interface CustomerInfoProps {
  updateInfo: (key: keyof CustomerFormInfo, value: string) => void;
  first_name?: InputValue;
  last_name?: InputValue;
  phone_number?: InputValue;
  email?: InputValue;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = ({
  updateInfo,
  first_name,
  last_name,
  phone_number,
  email,
}) => {
  return (
    <CheckoutContainer header="Contact Information">
      <Button color="var(--primary-blue)">Select Info</Button>
      <div className={classes.inputs}>
        <div className={classes.name}>
          <CheckoutTextInput
            label="First Name"
            inputSettings={{
              placeholder: "Daylight",
              value: first_name?.value,
            }}
            onInputChange={(name) => {
              updateInfo("first_name", name);
            }}
          />
          <CheckoutTextInput
            label="Last Name"
            inputSettings={{ placeholder: "Donuts", value: last_name?.value }}
            onInputChange={(name) => {
              updateInfo("last_name", name);
            }}
          />
        </div>
        <CheckoutTextInput
          label="Phone Number"
          inputSettings={{
            placeholder: "#",
            type: "tel",
            value: phone_number?.value,
          }}
          onInputChange={(phone) => {
            updateInfo("phone_number", phone);
          }}
        />
        <CheckoutTextInput
          label="Email"
          inputSettings={{
            placeholder: "daylightdonuts@gmail.com",
            type: "email",
            value: email?.value,
          }}
          onInputChange={(email) => {
            updateInfo("email", email);
          }}
        />
      </div>
    </CheckoutContainer>
  );
};

export default CustomerInfo;
