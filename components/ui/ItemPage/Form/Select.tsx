import { ExtraInfo } from "@_types/database/cart";
import { ItemExtra } from "@_types/database/menu";
import { ChangeEvent, FunctionComponent, useEffect } from "react";

interface SelectProps {
  itemExtras: ItemExtra[];
  category: string;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
}

const Select: FunctionComponent<SelectProps> = ({
  itemExtras,
  category,
  updateExtras,
}) => {
  useEffect(() => {
    const info = itemExtras[0];
    const { name, id, price } = info;

    updateExtras(category, { extra: name, id, price });
  }, []);

  const extraChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { name, id, price } = itemExtras[+value];
    updateExtras(category, {
      extra: name,
      id,
      price,
    });
  };
  return (
    <select id={category} name={category} onChange={extraChange}>
      {itemExtras.map((extra, index) => {
        return (
          <option key={extra.name} value={index}>
            {extra.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
