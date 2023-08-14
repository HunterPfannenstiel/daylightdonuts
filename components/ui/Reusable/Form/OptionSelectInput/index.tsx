import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/client";

type OptionSelectInputProps = (
  | {
      data: OptionSelectInputData[];
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

export type OptionSelectInputData = { category: string; options: string[] };

const OptionSelectInput = ({
  data,
  labelExtractor,
  optionsExtractor,
  optionExtractor,
  onSelect,
  containerClassName,
  selectContainerClassName,
}: OptionSelectInputProps) => {
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
            className={concatClassNames(
              classes.select_container,
              selectContainerClassName
            )}
          >
            <label htmlFor={label}>{label}</label>
            <select
              id={label}
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

export default OptionSelectInput;
