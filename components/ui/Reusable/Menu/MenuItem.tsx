import { FunctionComponent, ReactNode } from "react";
import classes from "./MenuItem.module.css";
import ItemCard from "./ItemCard";
import ImageComponent from "../Image/ImageComponent";
import Link from "next/link";

interface MenuItemProps {
  image?: string;
  icon?: ReactNode;
  name: string;
  linkText: string;
  href: string;
  price?: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  image,
  icon,
  name,
  href,
  price,
  linkText,
}) => {
  return (
    <ItemCard className={classes.item_container}>
      <div className={classes.image}>
        {image && <ImageComponent src={image} width={200} height={200} />}
        {icon ? icon : null}
      </div>
      <div className={classes.bottom_section}>
        <div>
          <h3>{name}</h3>
          {price && <p>{price}</p>}
        </div>
        <Link href={href} className={classes.link}>
          {linkText}
        </Link>
      </div>
    </ItemCard>
  );
};

export default MenuItem;
