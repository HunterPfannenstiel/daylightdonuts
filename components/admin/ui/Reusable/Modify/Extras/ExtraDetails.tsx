import { FunctionComponent, useEffect } from "react";
import { ExtraDetails as ExtraDetailsT } from "@_types/admin/modify-menu";
import TextInput from "@_admin-reuse/Form/Inputs/TextInput";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import PriceInput from "@_admin-reuse/Form/Inputs/PriceInput";
import SelectInput from "@_admin-reuse/Form/Inputs/SelectInput";

interface ExtraDetailsProps {
  initialDetails: ExtraDetailsT;
  updateHandler: (key: keyof ExtraDetailsT, value: any) => void;
  canFlipPage: (bool: boolean) => void;
}

const ExtraDetails: FunctionComponent<ExtraDetailsProps> = ({
  initialDetails,
  updateHandler,
  canFlipPage,
}) => {
  useEffect(() => {
    canFlipPage(!!initialDetails.name);
  }, []);
  const updateDetails = (key: keyof ExtraDetailsT, value: any) => {
    updateHandler(key, value);
    canFlipPage(!!initialDetails.name);
  };
  return (
    <Fieldset legend="Create Extra!">
      <TextInput
        inputId="name"
        label="Name"
        handler={(inputValue) => {
          updateDetails("name", inputValue);
        }}
        defaultValue={initialDetails.name}
        required
      />
      <PriceInput
        inputId="price"
        label="Price"
        handler={(inputValue) => {
          updateDetails("price", inputValue);
        }}
        defaultValue={initialDetails.price}
      />
      <TextInput
        inputId="abbreviation"
        label="Abbreviation"
        handler={(inputValue) => {
          updateDetails("abbreviation", inputValue);
        }}
        defaultValue={initialDetails.abbreviation}
      />
      {initialDetails.isArchived !== undefined && (
        <SelectInput
          inputId="archived"
          label="Archive"
          defaultChecked={initialDetails.isArchived}
          handler={(isSelected) => {
            updateDetails("isArchived", isSelected);
          }}
          type="checkbox"
        />
      )}
    </Fieldset>
  );
};

export default ExtraDetails;
