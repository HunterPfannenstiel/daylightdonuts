import { FunctionComponent, useEffect } from "react";
import { ExtraDetails as ExtraDetailsT } from "@_types/admin/modify-menu";
import TextInput from "@_admin-reuse/Form/Inputs/TextInput";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import PriceInput from "@_admin-reuse/Form/Inputs/PriceInput";
import SelectInput from "@_admin-reuse/Form/Inputs/SelectInput";
import { UpdateDetails } from "@_hooks/admin/menu/modification/useDetails";

interface ExtraDetailsProps {
  initialDetails: ExtraDetailsT;
  updateHandler: UpdateDetails<ExtraDetailsT>;
}

const ExtraDetails: FunctionComponent<ExtraDetailsProps> = ({
  initialDetails,
  updateHandler,
}) => {
  return (
    <Fieldset legend="Create Extra!">
      <TextInput
        inputId="name"
        label="Name"
        handler={(inputValue) => {
          updateHandler("name", inputValue);
        }}
        defaultValue={initialDetails.name}
        required
      />
      <PriceInput
        inputId="price"
        label="Price"
        handler={(inputValue) => {
          updateHandler("price", inputValue);
        }}
        defaultValue={initialDetails.price || ""}
      />
      <TextInput
        inputId="abbreviation"
        label="Abbreviation"
        handler={(inputValue) => {
          updateHandler("abbreviation", inputValue);
        }}
        defaultValue={initialDetails.abbreviation}
      />
      {initialDetails.isArchived !== undefined && (
        <SelectInput
          inputId="archived"
          label="Archive"
          defaultChecked={initialDetails.isArchived}
          handler={(isSelected) => {
            updateHandler("isArchived", isSelected);
          }}
          type="checkbox"
        />
      )}
    </Fieldset>
  );
};

export default ExtraDetails;
