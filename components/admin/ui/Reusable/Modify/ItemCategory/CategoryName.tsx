import { FunctionComponent, MutableRefObject } from "react";
import classes from "./SubcategoryName.module.css";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "components/ui/Reusable/Form/TextInput";

interface CategoryNameProps {
  initialName: MutableRefObject<string>;
  updateName: (name: string) => void;
}

const CategoryName: FunctionComponent<CategoryNameProps> = ({
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

export default CategoryName;
