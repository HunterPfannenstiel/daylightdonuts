import { FunctionComponent } from "react";
import classes from "./ItemExtras.module.css";
import {
  AvailableExtraGroupings,
  SelectedExtraGroupings,
} from "@_types/admin/forms";

interface ItemExtrasProps {
  groupings: AvailableExtraGroupings;
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
          <div>
            <h2>{group.category}</h2>
            <div>
              <div>
                <label htmlFor={`none-${group.category}`}>None</label>
                <input
                  type="radio"
                  id={`none-${group.category}`}
                  name={group.category}
                  defaultChecked={!selectedGroupings[group.category]}
                  onClick={updateSelectedGroupings.bind(
                    null,
                    group.category,
                    undefined
                  )}
                />
              </div>
              {group.extra_groupings.map((grouping) => {
                return (
                  <div>
                    <label htmlFor={grouping.name}>{grouping.name}</label>
                    <input
                      type="radio"
                      id={grouping.name}
                      name={group.category}
                      defaultChecked={
                        selectedGroupings[group.category] ===
                        grouping.extra_group_id
                      }
                      onClick={updateSelectedGroupings.bind(
                        null,
                        group.category,
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
