import { ElementType, ReactNode } from "react";
import classes from "./index.module.css";
import { PolymorphicComponent } from "@_types/polymorphic";
import { concatClassNames } from "@_utils/client";

interface RowContainerProps {
  children: ReactNode;
}

const RowContainer = <C extends ElementType = "div">({
  as,
  children,
  className,
  ...restProps
}: PolymorphicComponent<C, RowContainerProps>) => {
  const Component = as || "div";
  return (
    <Component
      className={concatClassNames(classes.container, className)}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default RowContainer;
