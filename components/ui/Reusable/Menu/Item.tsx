import { MenuItem } from "@_types/database/menu";
import { FunctionComponent, ReactNode, useState } from "react";
import classes from "./Item.module.css";
import MenuItemImage from "../Image/MenuItemImage";

interface ItemProps {
  item: MenuItem;
  button: ReactNode;
}

const Item: FunctionComponent<ItemProps> = ({ item, button }) => {
  const image =
    item.image_url === "imageURL"
      ? "/Images/DAYLIGHTDONUTS.png"
      : item.image_url;
  const [animateIn, setAnimateIn] = useState(false);
  const handleLoadComplete = () => {
    setAnimateIn(true);
  };
  const animate = animateIn ? classes.animate_in : "";
  return (
    <li className={classes.item}>
      <div className={classes.top}>
        <MenuItemImage
          className={animate}
          imageUrl={image}
          alt={item.name}
          handleLoadComplete={handleLoadComplete}
        />
      </div>
      <div className={classes.item_info}>
        <div className={classes.item_text}>
          <h3>{item.name}</h3>
          <p>
            <b>{`$${item.price}`}</b>
          </p>
        </div>
      </div>
      {button}
    </li>
  );
};

export default Item;
