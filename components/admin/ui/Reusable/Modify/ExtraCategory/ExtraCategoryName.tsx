import { FunctionComponent, MutableRefObject } from "react";
import classes from "./ExtraCategoryName.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "components/ui/Reusable/Form/TextInput";

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
        id="cat-name"
        label="Name"
        handler={updateName}
        defaultValue={initialName.current}
      />
    </Fieldset>
  );
};

export default ExtraCategoryName;
