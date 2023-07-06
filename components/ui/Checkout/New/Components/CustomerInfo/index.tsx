import { FunctionComponent } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import CheckoutTextInput from "components/ui/Reusable/Form/CheckoutTextInput";
import { CustomerFormInfo } from "@_types/database/checkout";

interface CustomerInfoProps {
  updateInfo: (key: keyof CustomerFormInfo, value: string) => void;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = ({
  updateInfo,
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  return (
    <CheckoutContainer header="Contact Information">
      <div className={classes.inputs}>
        <div className={classes.name}>
          <CheckoutTextInput
            label="First Name"
            required
            onInputChange={(name) => {
              updateInfo("first_name", name);
            }}
            placeholder="Daylight"
          />
          <CheckoutTextInput
            label="Last Name"
            required
            onInputChange={(name) => {
              updateInfo("last_name", name);
            }}
            placeholder="Donuts"
          />
        </div>
        <CheckoutTextInput
          label="Phone Number"
          required
          onInputChange={(phone) => {
            updateInfo("phone_number", phone);
          }}
          placeholder="#"
          type="tel"
        />
        <CheckoutTextInput
          label="Email"
          required
          onInputChange={(email) => {
            updateInfo("email", email);
          }}
          placeholder="daylightdonuts@gmail.com"
        />
      </div>
    </CheckoutContainer>
  );
};

export default CustomerInfo;
