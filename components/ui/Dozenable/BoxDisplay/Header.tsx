import { FunctionComponent } from "react";
import classes from "./Header.module.css";

interface HeaderProps {
  itemAmount: number;
  groupSize: number;
  className: string;
}

const Header: FunctionComponent<HeaderProps> = ({
  itemAmount,
  groupSize,
  className,
}) => {
  return (
    <div className={className}>
      <h2 className={classes.header}>Your Box</h2>
      <p className={classes.amount}>{`${itemAmount} / ${groupSize}`}</p>
    </div>
  );
};

export default Header;
