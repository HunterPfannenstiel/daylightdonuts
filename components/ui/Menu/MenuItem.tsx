import { MenuItem } from "@_types/database/menu";
import Link from "next/link";
import { FunctionComponent } from "react";
import Item from "../Reusable/Menu/Item";
import classes from "./MenuItem.module.css";

interface MenuItemProps {
  item: MenuItem;
  linkURLPrefix: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  item,
  linkURLPrefix,
}) => {
  const button = (
    <Link href={`${linkURLPrefix}${item.name}`} className={classes.button}>
      Customize
    </Link>
  );
  return <Item item={item} button={button} />;
};

export default MenuItem;
