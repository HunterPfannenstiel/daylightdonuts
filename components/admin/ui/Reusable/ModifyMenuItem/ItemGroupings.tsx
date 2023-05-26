import { FunctionComponent, useState } from "react";
import classes from "./ItemGroupings.module.css";
import { AvailableGrouping } from "@_types/admin/forms";

//RADIO

interface ItemGroupingsProps {
  availableGroupings: AvailableGrouping[];
  selectedId?: number;
  groupingSelectHandler: (selectedId: number | undefined) => void;
}

const ItemGroupings: FunctionComponent<ItemGroupingsProps> = ({
  availableGroupings,
  selectedId,
  groupingSelectHandler,
}) => {
  if (availableGroupings.length === 0) {
    return <p>No groupings have been added to the store</p>;
  }
  return (
    <fieldset>
      <div>
        <label htmlFor="none">No Grouping</label>
        <input
          type="radio"
          name="grouping"
          id="none"
          defaultChecked={selectedId === undefined}
          onChange={groupingSelectHandler.bind(null, undefined)}
        />
      </div>
      {availableGroupings.map((grouping) => {
        return (
          <div key={grouping.name}>
            <label htmlFor={grouping.name}>{grouping.name}</label>
            <input
              type="radio"
              name="grouping"
              id={grouping.name}
              defaultChecked={selectedId === grouping.grouping_id}
              onChange={groupingSelectHandler.bind(null, grouping.grouping_id)}
            />
          </div>
        );
      })}
    </fieldset>
  );
};

export default ItemGroupings;
