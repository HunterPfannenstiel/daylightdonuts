import { FunctionComponent, useEffect } from "react";
import classes from "./OrderDetails.module.css";
import CheckoutContainer from "../CheckoutContainer";
import OptionSelectInput from "components/ui/Reusable/Form/OptionSelectInput";
import InputLayout from "components/ui/Reusable/Form/InputLayout";
import usePickupInfo from "@_hooks/checkout/usePickupInfo";
import { OrderLocationDetails } from "@_types/database/checkout";

interface OrderDetailsProps {
  updateLocationDetails: (
    key: keyof OrderLocationDetails,
    value: string
  ) => void;
  values: OrderLocationDetails;
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  updateLocationDetails,
  values,
}) => {
  const { data, isLoading } = usePickupInfo();
  useEffect(() => {
    if (data) {
      updateLocationDetails("locationId", data[0].location_id.toString());
      updateLocationDetails("pickupTimeId", data[0].times[0].id.toString());
    }
  }, [data]);
  if (!data || isLoading) return <p>Loading...</p>;
  const times =
    data.find((location) => location.location_id === +values.locationId.value)
      ?.times || [];

  return (
    <CheckoutContainer header="My Order">
      <OptionSelectInput
        label="Location"
        required
        options={data.map((location) => ({
          id: location.location_id,
          name: location.common_name,
        }))}
        onOptionSelected={(id) => {
          updateLocationDetails("locationId", id.toString());
        }}
        className={classes.location}
      />
      <div className={classes.time_date}>
        <OptionSelectInput
          label="Time"
          required
          options={times}
          onOptionSelected={(id) => {
            updateLocationDetails("pickupTimeId", id.toString());
          }}
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
