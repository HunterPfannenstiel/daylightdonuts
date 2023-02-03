import { IntervalButton, IntervalChange } from "@_types/admin/orders";
import { FunctionComponent } from "react";
import DateButton from "./DateButton";
import classes from "./DateButtons.module.css";

interface DateButtonsProps {
  buttons: IntervalButton<any>[];
  intervalChange: IntervalChange<any>;
}

const DateButtons: FunctionComponent<DateButtonsProps> = ({
  buttons,
  intervalChange,
}) => {
  return (
    <div className={classes.buttons}>
      {buttons.map((buttonInfo) => {
        return (
          <DateButton
            key={buttonInfo.label}
            text={buttonInfo.label}
            onClick={buttonInfo.onClick.bind(null, intervalChange)}
          />
        );
      })}
    </div>
  );
};

export default DateButtons;
