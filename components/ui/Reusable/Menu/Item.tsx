import { MenuItem } from "@_types/database/menu";
import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import classes from "./Item.module.css";

interface ItemProps {
  item: MenuItem;
  button: ReactNode;
}

const Item: FunctionComponent<ItemProps> = ({ item, button }) => {
  const image =
    item.image === "imageURL" ? "/Images/DAYLIGHTDONUTS.png" : item.image;
  return (
    <li className={classes.item}>
      <div className={classes.top}>
        <div className={classes.image_container}>
          <Image src={image} alt={item.name} width={500} height={500} />
        </div>
      </div>
      <div className={classes.item_info}>
        <div className={classes.item_text}>
          <h3>{item.name}</h3>
          <p>{`${item.price} /ea`}</p>
        </div>
        {button}
      </div>
    </li>
  );
};

export default Item;
