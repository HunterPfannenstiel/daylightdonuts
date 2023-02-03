import { moneyToNum } from "@_providers/cart/utils";
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
    let numPrice = null;
    if (price) {
      numPrice = moneyToNum(price);
    }
    updateExtras(category, { extra: name, id, price: numPrice });
  }, []);

  const extraChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { name, id, price } = itemExtras[+value];
    let numPrice = null;
    if (price) {
      numPrice = moneyToNum(price);
    }
    updateExtras(category, {
      extra: name,
      id,
      price: numPrice,
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
