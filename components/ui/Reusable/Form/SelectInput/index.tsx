import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/client";

type SelectInputProps = (
  | {
      data: SelectData[];
      labelExtractor?: (category: any) => string;
      optionsExtractor?: (category: any) => any[];
      optionExtractor?: (option: any) => string;
    }
  | {
      data: any[];
      labelExtractor: (category: any) => string;
      optionsExtractor: (category: any) => any[];
      optionExtractor: (option: any) => string;
    }
) & {
  onSelect: (category: string, option: any) => void;
  containerClassName?: string;
  selectContainerClassName?: string;
};

export type SelectData = { category: string; options: string[] };

const SelectInput: FunctionComponent<SelectInputProps> = ({
  data,
  labelExtractor,
  optionsExtractor,
  optionExtractor,
  onSelect,
  containerClassName,
  selectContainerClassName,
}) => {
  return (
    <ul className={concatClassNames(classes.container, containerClassName)}>
      {data.map((category) => {
        const label = labelExtractor
          ? labelExtractor(category)
          : category.category;
        const options = optionsExtractor
          ? optionsExtractor(category)
          : (category.options as any[]);
        return (
          <li
            key={label}
            className={[
              classes.select_container,
              selectContainerClassName,
            ].join(" ")}
          >
            <label>{label}</label>
            <select
              onChange={(e) => {
                const optionIndex = +e.target.value;
                onSelect(label, options[optionIndex]);
              }}
            >
              {options.map((option, i) => {
                const optionLabel = optionExtractor
                  ? optionExtractor(option)
                  : option;

                return (
                  <option value={i} key={`${label}-${optionLabel}`}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          </li>
        );
      })}
    </ul>
  );
};

export default SelectInput;
