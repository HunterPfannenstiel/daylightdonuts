import { FunctionComponent } from "react";
import classes from "./OptionSelectInput.module.css";
import { DBEntity } from "@_types/admin/modify-menu";
import InputLayout from "./InputLayout";

interface OptionSelectInputProps {
  label: string;
  options: DBEntity[];
  onOptionSelected: (id: number) => void;
  required?: boolean;
  className?: string;
}

const OptionSelectInput: FunctionComponent<OptionSelectInputProps> = ({
  label,
  options,
  onOptionSelected,
  required,
  className,
}) => {
  return (
    <InputLayout
      className={className}
      labelComponent={
        <label htmlFor={label}>
          {label}
          {required && <span>*</span>}
        </label>
      }
      inputComponent={
        <select
          required={required}
          id={label}
          onChange={(e) => {
            onOptionSelected(+e.target.value);
          }}
        >
          {options.map(({ id, name }) => {
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          })}
        </select>
      }
    />
  );
};

export default OptionSelectInput;
