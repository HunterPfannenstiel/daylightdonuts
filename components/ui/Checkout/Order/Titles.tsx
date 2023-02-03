import { FunctionComponent } from "react";
import classes from "./Titles.module.css";

interface TitlesProps {}

const Titles: FunctionComponent<TitlesProps> = () => {
  return (
    <div className={classes.titles}>
      <div className={classes.items}>
        <h4>Items</h4>
      </div>
      <div className={classes.amount}>
        <h4>Amount</h4>
      </div>
      <div className={classes.price}>
        <h4>Price</h4>
      </div>
    </div>
  );
};

export default Titles;
