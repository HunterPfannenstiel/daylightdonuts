import { FunctionComponent } from "react";
import classes from "./ItemExtras.module.css";
import {
  AvailableExtraGrouping,
  SelectedExtraGroupings,
} from "@_types/admin/forms";

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
    <fieldset>
      {groupings.map((group) => {
        return (
          <div key={group.name}>
            <h2>{group.name}</h2>
            <div>
              <div>
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
              </div>
              {group.extra_groupings.map((grouping) => {
                return (
                  <div key={grouping.name}>
                    <label htmlFor={grouping.name}>{grouping.name}</label>
                    <input
                      type="radio"
                      id={grouping.name}
                      name={group.name}
                      defaultChecked={
                        selectedGroupings[group.name] ===
                        grouping.extra_group_id
                      }
                      onClick={updateSelectedGroupings.bind(
                        null,
                        group.name,
                        grouping.extra_group_id
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
};

export default ItemExtras;
