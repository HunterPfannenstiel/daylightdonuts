import { FunctionComponent, ReactNode } from "react";
import classes from "./ItemCard.module.css";
import { concatClassNames } from "@_utils/client";

interface ItemCardProps {
  children: ReactNode;
  className?: string;
}

const ItemCard: FunctionComponent<ItemCardProps> = ({
  children,
  className,
}) => {
  return (
    <div className={concatClassNames(classes.container, className)}>
      {children}
    </div>
  );
};

export default ItemCard;
