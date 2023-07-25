import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/client";

interface ScrollListProps {
  className?: string;
  children: ReactNode;
}

const ScrollList: FunctionComponent<ScrollListProps> = ({
  className,
  children,
}) => {
  return (
    <ul className={concatClassNames(classes.list, className)}>{children}</ul>
  );
};

export default ScrollList;
