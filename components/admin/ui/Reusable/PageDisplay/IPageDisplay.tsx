import { FunctionComponent, ReactNode } from "react";
import classes from "./IPageDisplay.module.css";

interface IPageDisplayProps {
  title: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

const IPageDisplay: FunctionComponent<IPageDisplayProps> = ({
  title,
  children,
  leftIcon,
  rightIcon,
  className,
}) => {
  return (
    <div className={classes.display + " " + className}>
      <div className={classes.heading}>
        {leftIcon}
        <h3>{title}</h3>
        {rightIcon}
      </div>
      {children}
    </div>
  );
};

export default IPageDisplay;
