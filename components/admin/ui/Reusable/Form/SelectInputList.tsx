import { FunctionComponent } from "react";
import classes from "./SelectInputList.module.css";
import { DBEntity } from "@_types/admin/modify-menu";
import SelectInput from "../../../../ui/Reusable/Form/SelectInput";

type SelectInputListProps =
  | {
      title?: string;
      selections: DBEntity[];
      initialSelections: { [id: number]: any };
      initialSelection?: undefined;
      onSelect: (id: number, name: string, selected: boolean) => void;
      type: "checkbox";
      radioName?: undefined;
      alwaysChecked?: boolean;
    }
  | {
      title?: string;
      selections: DBEntity[];
      initialSelections?: undefined;
      initialSelection?: number;
      onSelect: (id: number, name: string, selected: boolean) => void;
      type: "radio";
      radioName: string;
      alwaysChecked?: undefined;
    };

const SelectInputList: FunctionComponent<SelectInputListProps> = ({
  title,
  selections,
  onSelect,
  initialSelections,
  initialSelection,
  type,
  radioName,
  alwaysChecked = false,
}) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className={classes.selections}>
        {selections.map((selection) => {
          const isSelected =
            type === "radio"
              ? initialSelection === selection.id
              : !!initialSelections[selection.id];
          return (
            <SelectInput
              key={selection.id}
              id={selection.name}
              label={selection.name}
              defaultChecked={isSelected || alwaysChecked}
              handler={(selected) => {
                onSelect(selection.id, selection.name, selected);
              }}
              type={type}
              radioName={radioName}
            />
          );
        })}
      </ul>
    </>
  );
};

export default SelectInputList;
