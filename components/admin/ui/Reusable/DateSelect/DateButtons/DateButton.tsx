import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./DateButton.module.css";

interface DateButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

const DateButton: FunctionComponent<DateButtonProps> = ({ text, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {text}
    </button>
  );
};

export default DateButton;
