import Arrow from "components/ui/Reusable/Arrow";
import { FunctionComponent } from "react";
import classes from "./Amount.module.css";

interface AmountProps {
  amount: number;
  disabledPlus?: boolean;
  disabledMinus?: boolean;
  getUpdatedAmount: (newAmount: number) => void;
}

const Amount: FunctionComponent<AmountProps> = ({
  amount,
  disabledPlus,
  disabledMinus,
  getUpdatedAmount,
}) => {
  // let disabled = maxAmount ? amount >= maxAmount : false;
  return (
    <div className={classes.amount}>
      <Arrow
        role="button"
        onClick={() => {
          if (!disabledMinus) getUpdatedAmount(-1);
        }}
        direction="Down"
      />

      <div className={classes.amount_value}>
        <p>{amount}</p>
      </div>
      <Arrow
        role="button"
        onClick={() => {
          if (!disabledPlus) getUpdatedAmount(1);
        }}
      />
    </div>
  );
};

export default Amount;
