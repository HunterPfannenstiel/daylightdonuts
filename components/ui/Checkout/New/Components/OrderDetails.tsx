import { FunctionComponent, useEffect } from "react";
import classes from "./OrderDetails.module.css";
import CheckoutContainer from "../CheckoutContainer";
import InputLayout from "components/ui/Reusable/Form/InputLayout";
import usePickupInfo from "@_hooks/checkout/usePickupInfo";
import { FormLocationDetails } from "@_types/database/checkout";
import Spinner from "components/ui/Reusable/Spinner";
import SelectOptionInput from "components/ui/Reusable/Form/OptionSelectInput";

interface OrderDetailsProps {
  updateLocationDetails: (
    key: keyof FormLocationDetails,
    value: string
  ) => void;
  values: FormLocationDetails;
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
      updateLocationDetails("pickupDate", "2023-07-11");
    }
  }, [data]);

  const times =
    data?.find((location) => location.location_id === +values.locationId.value)
      ?.times || [];

  return (
    <CheckoutContainer header="My Order" contentClass={classes.content}>
      {isLoading && <Spinner center />}
      {!isLoading && (
        <div className={classes.content}>
          <SelectOptionInput
            data={[
              {
                category: "Location",
                options:
                  data?.map((location) => ({
                    id: location.location_id,
                    name: location.common_name,
                  })) || [],
              },
            ]}
            labelExtractor={({ category }) => category}
            optionsExtractor={({ options }) => options}
            optionExtractor={({ name }) => name}
            onSelect={(_, { id }) => {
              updateLocationDetails("locationId", id);
            }}
            containerClassName={classes.location}
          />
          <div className={classes.time_date}>
            <SelectOptionInput
              data={[
                {
                  category: "Time",
                  options: times,
                },
              ]}
              labelExtractor={({ category }) => category}
              optionsExtractor={({ options }) => options}
              optionExtractor={({ name }) => name}
              onSelect={(_, { id }) => {
                updateLocationDetails("locationId", id);
              }}
            />
            <div className={classes.date}>
              <InputLayout
                label="Date*"
                htmlFor="date"
                inputComponent={<input id="date" type="date"/>}
              />
            </div>
          </div>
        </div>
      )}
    </CheckoutContainer>
  );
};

export default OrderDetails;
