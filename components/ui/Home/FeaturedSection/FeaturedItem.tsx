import { FunctionComponent } from "react";
import classes from "./FeaturedItem.module.css";
import ItemImage from "./ItemImage";
import Link from "next/link";

interface FeaturedItemProps {
  name: string;
  image: string;
}

const FeaturedItem: FunctionComponent<FeaturedItemProps> = ({
  name,
  image,
}) => {
  return (
    <div className={classes.item_container}>
      <ItemImage src={image} />
      <h3>{name}</h3>
      <Link href={`/menu/${name}`} className={classes.link}>
        Customize
      </Link>
    </div>
  );
};

export default FeaturedItem;
