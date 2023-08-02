import { FunctionComponent } from "react";
import classes from "./ItemExtras.module.css";
import {
  AvailableExtraGrouping,
  SelectedExtraGroupings,
} from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import Accordian from "components/ui/Reusable/Accordian";
import SelectInput from "@ui/Reusable/Form/SelectInput";

//RADIO

interface ItemExtrasProps {
  groupings: AvailableExtraGrouping[];
  selectedGroupings: SelectedExtraGroupings;
  updateSelectedGroupings: (
    category: string,
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
              data={[
                { name: "None", extra_group_id: undefined },
                ...group.extra_groupings,
              ]}
              componentExtractor={(grouping) => {
                return (
                  <SelectInput
                    label={grouping.name}
                    handler={() => {
                      updateSelectedGroupings.bind(
                        null,
                        group.name,
                        grouping.extra_group_id
                      );
                    }}
                    type="radio"
                    defaultChecked={
                      selectedGroupings[group.name] === grouping.extra_group_id
                    }
                    name={group.name}
                    id={group.name + grouping.name}
                  />
                );
                // return (
                //   <div key={grouping.name}>
                //     <label htmlFor={grouping.name}>{grouping.name}</label>
                //     <input
                //       type="radio"
                //       id={grouping.name}
                //       name={group.name}
                //       defaultChecked={
                //         selectedGroupings[group.name] ===
                //         grouping.extra_group_id
                //       }
                //       onClick={updateSelectedGroupings.bind(
                //         null,
                //         group.name,
                //         grouping.extra_group_id
                //       )}
                //     />
                //   </div>
                // );
              }}
            />
            {/* <div>
                <label htmlFor={`none-${group.name}`}>None</label>
                <input
                  type="radio"
                  id={`none-${group.name}`}
                  name={group.name}
                  defaultChecked={!selectedGroupings[group.name]}
                  onClick={updateSelectedGroupings.bind(
                    null,
                    group.name,
                    undefined
                  )}
                />
              </div> */}
          </div>
        );
      })}
    </Fieldset>
  );
};

export default ItemExtras;
