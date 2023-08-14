import { FunctionComponent, MutableRefObject } from "react";
import classes from "./SubcategoryName.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "components/ui/Reusable/Form/TextInput";

interface SubcategoryNameProps {
  initialName: MutableRefObject<string>;
  updateName: (name: string) => void;
}

const SubcategoryName: FunctionComponent<SubcategoryNameProps> = ({
  initialName,
  updateName,
}) => {
  return (
    <Fieldset>
      <TextInput
        id="name"
        label="Name"
        handler={updateName}
        defaultValue={initialName.current}
      />
    </Fieldset>
  );
};

export default SubcategoryName;
