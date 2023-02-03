import Radio from "components/ui/Reusable/Radio";
import { ChangeEvent, FunctionComponent } from "react";
import classes from "./DateFilter.module.css";

interface DateFilterProps {
  intervalChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateFilter: FunctionComponent<DateFilterProps> = ({ intervalChange }) => {
  return (
    <form className={classes.filter}>
      <Radio
        label="Week"
        color={"green"}
        value={"Week"}
        onChange={intervalChange}
      />
      <Radio label="Month" value={"Month"} onChange={intervalChange} />
      <Radio label="Year" value={"Year"} onChange={intervalChange} />
    </form>
  );
};

export default DateFilter;
