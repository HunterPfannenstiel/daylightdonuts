import { FunctionComponent } from "react";
import classes from "./SelectInputList.module.css";
import { DBEntity, InitialSelections } from "@_types/admin/modify-menu";
import SelectInput from "./Inputs/SelectInput";

type SelectInputListProps =
  | {
      title?: string;
      selections: DBEntity[];
      initialSelections: InitialSelections;
      initialSelection?: undefined;
      onSelect: (id: number, name: string) => void;
      type: "checkbox";
      radioName?: undefined;
      alwaysChecked?: boolean;
    }
  | {
      title?: string;
      selections: DBEntity[];
      initialSelections?: undefined;
      initialSelection?: number;
      onSelect: (id: number, name: string) => void;
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
              : initialSelections[selection.id];
          return (
            <SelectInput
              key={selection.id}
              inputId={selection.name}
              label={selection.name}
              defaultChecked={isSelected || alwaysChecked}
              handler={() => {
                onSelect(selection.id, selection.name);
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
