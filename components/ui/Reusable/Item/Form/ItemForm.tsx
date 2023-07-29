import { ExtraInfo } from "@_types/database/cart";
import { ItemExtra, ItemExtras } from "@_types/database/menu";
import { FormEvent, FunctionComponent, useRef } from "react";
import Button from "../../Button";
import classes from "./ItemForm.module.css";
import SelectInput from "../../Form/OptionSelectInput";

interface ItemFormProps {
  extras: ItemExtras[] | null;
  buttonName?: string;
  maxAmount?: number;
  addItemToCart: (amount: number) => void;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
}

const ItemForm: FunctionComponent<ItemFormProps> = ({
  extras,
  buttonName,
  maxAmount,
  addItemToCart,
  updateExtras,
}) => {
  const onExtraSelected = (
    category: string,
    { name, id, price }: ItemExtra
  ) => {
    updateExtras(category, { extra: name, id, price });
  };
  const amountRef = useRef<HTMLSelectElement>(null);
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const amount = +amountRef!.current!.value;
    addItemToCart(amount);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      {extras && (
        <SelectInput
          data={extras}
          onSelect={onExtraSelected}
          labelExtractor={({ category }: ItemExtras) => category}
          optionsExtractor={({ extras }: ItemExtras) => extras}
          optionExtractor={({ name }: ItemExtra) => name}
          containerClassName={classes.container}
        />
      )}
      <div className={classes.add_cart}>
        <Button
          type="submit"
          className={classes.blue_button}
          color={"var(--primary-blue)"}
          disabled={maxAmount === 0}
        >
          {buttonName || "Add to Cart"}
        </Button>
        {maxAmount !== 0 && (
          <select id="amount" name="amount" ref={amountRef}>
            {getOptions(maxAmount)}
          </select>
        )}
      </div>
    </form>
  );
};

const getOptions = (maxAmount: number | undefined) => {
  const options = [];
  let limit = maxAmount || 12;
  if (maxAmount === 0) {
    limit = 0;
  }
  for (let i = 1; i <= limit; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return options;
};

ItemForm.displayName = "ItemForm";

export default ItemForm;
