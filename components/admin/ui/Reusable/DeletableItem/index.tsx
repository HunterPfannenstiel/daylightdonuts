import { FunctionComponent, ReactNode } from "react";
import classes from "./DeletableItem.module.css";

interface DeletableItemProps {
  onDelete: () => void;
  promptBeforeDelete?: boolean;
  children: ReactNode;
}

const DeletableItem: FunctionComponent<DeletableItemProps> = ({
  onDelete,
  promptBeforeDelete,
  children,
}) => {
  return <div onClick={onDelete}>{children}</div>;
};

export default DeletableItem;
