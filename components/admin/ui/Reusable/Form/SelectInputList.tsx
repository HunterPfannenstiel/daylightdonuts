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
      onSelect: (id: number) => void;
      type: "checkbox";
      radioName?: undefined;
    }
  | {
      title?: string;
      selections: DBEntity[];
      initialSelections?: undefined;
      initialSelection?: number;
      onSelect: (id: number) => void;
      type: "radio";
      radioName: string;
    };

const SelectInputList: FunctionComponent<SelectInputListProps> = ({
  title,
  selections,
  onSelect,
  initialSelections,
  initialSelection,
  type,
  radioName,
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
              defaultChecked={isSelected}
              handler={() => {
                onSelect(selection.id);
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
