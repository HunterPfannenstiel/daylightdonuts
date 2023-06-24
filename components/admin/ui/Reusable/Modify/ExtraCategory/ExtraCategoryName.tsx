import { FunctionComponent, MutableRefObject } from "react";
import classes from "./ExtraCategoryName.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "@_admin-reuse/Form/Inputs/TextInput";

interface ExtraCategoryNameProps {
  title?: string;
  updateName: (newName: string) => void;
  initialName: MutableRefObject<string>;
}

const ExtraCategoryName: FunctionComponent<ExtraCategoryNameProps> = ({
  title,
  updateName,
  initialName,
}) => {
  return (
    <Fieldset legend={title}>
      <TextInput
        inputId="cat-name"
        label="Name"
        handler={updateName}
        defaultValue={initialName.current}
      />
    </Fieldset>
  );
};

export default ExtraCategoryName;
