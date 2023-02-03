import { ExtraInfo } from "@_types/database/cart";
import { ItemExtras } from "@_types/database/menu";
import { FunctionComponent } from "react";
import classes from "./Fieldset.module.css";
import Select from "./Select";

interface FieldsetProps {
  extra: ItemExtras;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({
  extra,
  updateExtras,
}) => {
  const { category } = extra;
  return (
    <fieldset>
      <label htmlFor={category}>{`${category}:`}</label>
      <Select
        itemExtras={extra.extras}
        category={category}
        updateExtras={updateExtras}
      />
    </fieldset>
  );
};

export default Fieldset;
