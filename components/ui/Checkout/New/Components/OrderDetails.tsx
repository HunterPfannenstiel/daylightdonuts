import { FunctionComponent } from "react";
import classes from "./OrderDetails.module.css";
import CheckoutContainer from "../CheckoutContainer";
import { DBEntity } from "@_types/admin/modify-menu";
import OptionSelectInput from "components/ui/Reusable/Form/OptionSelectInput";
import InputLayout from "components/ui/Reusable/Form/InputLayout";

interface OrderDetailsProps {
  locations: DBEntity[];
  times: DBEntity[];
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  locations,
  times,
}) => {
  const onLocationSelect = (id: number) => {
    console.log(id);
  };
  const onTimeSelect = (id: number) => {
    console.log(id);
  };
  return (
    <CheckoutContainer header="My Order">
      <OptionSelectInput
        label="Location"
        required
        options={locations}
        onOptionSelected={onLocationSelect}
        className={classes.location}
      />
      <div className={classes.time_date}>
        <OptionSelectInput
          label="Time"
          required
          options={times}
          onOptionSelected={onTimeSelect}
        />
        <div className={classes.date}>
          <InputLayout
            labelComponent={<p>Date*</p>}
            inputComponent={<button>Click</button>}
          />
        </div>
      </div>
    </CheckoutContainer>
  );
};

export default OrderDetails;
