import { FunctionComponent, useState } from "react";
import classes from "./PriceInput.module.css";
import TextInput from "@ui/Reusable/Form/TextInput";
import { formatPrice } from "@_utils/admin/modify-menu";

interface PriceInputProps {
  inputId: string;
  label: string;
  handler: (value: string) => void;
  defaultValue: string;
  maxPriceLength?: number;
  pricePrecision?: number;
}

const PriceInput: FunctionComponent<PriceInputProps> = ({
  inputId,
  label,
  handler,
  defaultValue,
  maxPriceLength,
  pricePrecision,
}) => {
  const [value, setValue] = useState(defaultValue);
  const onChangeHandler = (value: string) => {
    const price = formatPrice(value, maxPriceLength, pricePrecision);
    handler(price);
    setValue(price);
  };
  return (
    <TextInput
      id={inputId}
      label={label}
      handler={onChangeHandler}
      value={value}
    />
  );
};

export default PriceInput;
