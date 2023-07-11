import { FunctionComponent } from "react";
import classes from "./TotalItem.module.css";

interface TotalItemProps {
  label: string;
  total: string;
}

const TotalItem: FunctionComponent<TotalItemProps> = ({ label, total }) => {
  return (
    <div className={classes.total_item}>
      <p>{label}</p>
      <p>${total}</p>
    </div>
  );
};

export default TotalItem;
