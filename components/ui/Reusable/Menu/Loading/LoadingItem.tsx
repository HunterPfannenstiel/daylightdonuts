import { FunctionComponent } from "react";
import LoadingBlock from "../../LoadingBlock";
import classes from "./LoadingItem.module.css";

interface LoadingItemProps {}

const LoadingItem: FunctionComponent<LoadingItemProps> = () => {
  return (
    <li className={classes.item}>
      <div className={classes.top}>
        <div className={classes.image_container}>
          <LoadingBlock className={classes.image} />
        </div>
      </div>
      <div className={classes.item_info}>
        <div className={classes.item_text}>
          <LoadingBlock className={classes.name} />
          <LoadingBlock className={classes.price} />
        </div>
        <LoadingBlock className={classes.button} />
      </div>
    </li>
  );
};

export default LoadingItem;
