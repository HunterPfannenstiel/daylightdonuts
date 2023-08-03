import { FunctionComponent } from "react";
import classes from "./ItemExtras.module.css";
import {
  AvailableExtraGrouping,
  SelectedExtraGroupings,
} from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import Accordian from "components/ui/Reusable/Accordian";
import SelectInput from "@ui/Reusable/Form/SelectInput";

interface ItemExtrasProps {
  groupings: AvailableExtraGrouping[];
  selectedGroupings: SelectedExtraGroupings;
  updateSelectedGroupings: (
    categoryId: number,
    value: number | undefined
  ) => void;
}

const ItemExtras: FunctionComponent<ItemExtrasProps> = ({
  groupings,
  selectedGroupings,
  updateSelectedGroupings,
}) => {
  return (
    <Fieldset legend="Extras" className={classes.extras}>
      {groupings.map((group) => {
        return (
          <div key={group.name}>
            <Accordian
              Header={<h2 className={classes.header}>{group.name}</h2>}
              data={[{ name: "None", id: undefined }, ...group.extra_groupings]}
              componentExtractor={(grouping) => {
                return (
                  <SelectInput
                    label={grouping.name}
                    handler={() => {
                      updateSelectedGroupings(group.id, grouping.id);
                    }}
                    type="radio"
                    defaultChecked={selectedGroupings[group.id] === grouping.id}
                    name={group.name}
                    id={group.name + grouping.name}
                  />
                );
              }}
            />
          </div>
        );
      })}
    </Fieldset>
  );
};

export default ItemExtras;
