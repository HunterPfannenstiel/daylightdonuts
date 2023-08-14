import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import classes from "./CloseButton.module.css";
import Button from "../Button";

interface CloseButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: string;
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({
  color,
  ...restProps
}) => {
  return (
    <Button color={color} {...restProps}>
      X
    </Button>
  );
};

export default CloseButton;
