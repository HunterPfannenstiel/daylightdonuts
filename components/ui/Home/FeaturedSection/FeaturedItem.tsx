import { FunctionComponent } from "react";
import classes from "./FeaturedItem.module.css";
import ItemImage from "./ItemImage";
import Link from "next/link";
import ItemCard from "components/ui/Reusable/Menu/ItemCard";
import ImageComponent from "components/ui/Reusable/Image/ImageComponent";
import MenuItem from "components/ui/Reusable/Menu/MenuItem";

interface FeaturedItemProps {
  name: string;
  image: string;
}

const FeaturedItem: FunctionComponent<FeaturedItemProps> = ({
  name,
  image,
}) => {
  return (
    <MenuItem
      image={image}
      name={name}
      href={`/menu/${name}`}
      linkText="Customize"
    />
  );
};

export default FeaturedItem;
