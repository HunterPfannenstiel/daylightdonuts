import { FunctionComponent, ReactNode } from "react";
import classes from "./ItemList.module.css";

interface ItemListProps {
  className?: string;
  children: ReactNode;
}

const ItemList: FunctionComponent<ItemListProps> = ({
  className,
  children,
}) => {
  return <ul className={classes.item_list + " " + className}>{children}</ul>;
};

export default ItemList;
