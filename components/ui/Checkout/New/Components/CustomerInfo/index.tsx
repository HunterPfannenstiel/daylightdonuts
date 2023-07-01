import { FunctionComponent } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import CheckoutTextInput from "components/ui/Reusable/Form/CheckoutTextInput";

interface CustomerInfoProps {}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = () => {
  const onNameChange = (value: string) => {
    console.log(value);
  };
  return (
    <CheckoutContainer header="Contact Information">
      <div className={classes.inputs}>
        <div className={classes.name}>
          <CheckoutTextInput
            label="First Name"
            required
            onInputChange={onNameChange}
            placeholder="Daylight"
          />
          <CheckoutTextInput
            label="Last Name"
            required
            onInputChange={onNameChange}
            placeholder="Donuts"
          />
        </div>
        <CheckoutTextInput
          label="Phone Number"
          required
          onInputChange={onNameChange}
          placeholder="#"
          type="tel"
        />
        <CheckoutTextInput
          label="Email"
          required
          onInputChange={onNameChange}
          placeholder="daylightdonuts@gmail.com"
        />
      </div>
    </CheckoutContainer>
  );
};

export default CustomerInfo;
