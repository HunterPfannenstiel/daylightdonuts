import { FunctionComponent, useState } from "react";
import classes from "./ItemGroupings.module.css";
import Fieldset from "../Form/Fieldset";
import SelectInputList from "@_admin-reuse/Form/SelectInputList";
import { DBEntity } from "@_types/admin/modify-menu";

interface ItemGroupingsProps {
  availableGroupings: DBEntity[];
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
    <Fieldset legend="Groupings">
      <SelectInputList
        selections={[{ name: "No Grouping", id: -1 }, ...availableGroupings]}
        type="radio"
        initialSelection={selectedId || -1}
        onSelect={(id) => {
          id === -1
            ? groupingSelectHandler(undefined)
            : groupingSelectHandler(id);
        }}
        radioName="Groupings"
      />
    </Fieldset>
  );
};

export default ItemGroupings;
