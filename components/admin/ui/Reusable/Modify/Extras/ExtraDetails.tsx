import { FunctionComponent } from "react";
import classes from "./ExtraDetails.module.css";
import { ExtraDetails as ExtraDetailsT } from "@_types/admin/modify-menu";
import TextInput from "@_admin-reuse/Form/TextInput";

interface ExtraDetailsProps {
  initialDetails: ExtraDetailsT;
  updateHandler: (key: keyof ExtraDetailsT, value: any) => void;
}

const ExtraDetails: FunctionComponent<ExtraDetailsProps> = ({
  initialDetails,
  updateHandler,
}) => {
  return (
    <div>
      <h2>Create Extra!</h2>
      <TextInput
        inputId="name"
        label="Name"
        handler={(inputValue) => {
          updateHandler("name", inputValue);
        }}
        defaultValue={initialDetails.name}
      />
    </div>
  );
};

export default ExtraDetails;
