import { FunctionComponent, MutableRefObject } from "react";
import classes from "./ExtraGroupDetails.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "components/ui/Reusable/Form/TextInput";

interface ExtraGroupDetailsProps {
  initialName: MutableRefObject<string>;
  updateHandler: (name: string) => void;
  title?: string;
}

const ExtraGroupDetails: FunctionComponent<ExtraGroupDetailsProps> = ({
  initialName,
  updateHandler,
  title,
}) => {
  return (
    <Fieldset legend={title}>
      <TextInput
        id="name"
        label="name"
        handler={updateHandler}
        defaultValue={initialName.current}
      />
    </Fieldset>
  );
};

export default ExtraGroupDetails;
