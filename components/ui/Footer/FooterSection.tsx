import { FunctionComponent, ReactNode } from "react";
import classes from "./FooterSection.module.css";
import { concatClassNames } from "@_utils/client";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FooterSection: FunctionComponent<FooterSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={concatClassNames(classes.container, className)}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default FooterSection;
