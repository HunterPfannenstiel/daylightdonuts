import { ExtraInfo } from "@_types/database/cart";
import { ItemExtras } from "@_types/database/menu";
import { FormEvent, forwardRef } from "react";
import Button from "../../Button";
import Fieldset from "./Fieldset";
import classes from "./IItemForm.module.css";

interface IItemFormProps {
  extras: ItemExtras[] | null;
  buttonName?: string;
  maxAmount?: number;
  addItemToCart: (e: FormEvent) => void;
  updateExtras: (category: string, extraInfo: ExtraInfo) => void;
}

const IItemForm = forwardRef<HTMLSelectElement, IItemFormProps>(
  (
    { extras, maxAmount, buttonName, addItemToCart, updateExtras },
    amountRef
  ) => {
    const getOptions = () => {
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
    return (
      <form className={classes.form} onSubmit={addItemToCart}>
        {extras?.map((extra) => {
          if (extra.category !== null) {
            return (
              <Fieldset
                key={extra.category}
                extra={extra}
                updateExtras={updateExtras}
              />
            );
          }
        })}
        <div className={classes.add_cart}>
          <Button
            type="submit"
            className={classes.blue_button}
            color={"var(--primary-blue)"}
            disabled={maxAmount === 0}
          >
            {buttonName || "Add to Order"}
          </Button>
          {maxAmount !== 0 && (
            <select id="amount" name="amount" ref={amountRef}>
              {getOptions()}
            </select>
          )}
        </div>
      </form>
    );
  }
);

IItemForm.displayName = "IItemForm";

export default IItemForm;
