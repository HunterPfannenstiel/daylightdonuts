import Link from "next/link";
import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./MenuButton.module.css";

interface MenuButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

const MenuButton: FunctionComponent<MenuButtonProps> = ({
  disabled,
  ...props
}) => {
  const className = classes.menu + " " + (disabled ? classes.disabled : "");
  return (
    <Link href="/menu" className={className} {...props}>
      Menu
    </Link>
  );
};

export default MenuButton;
