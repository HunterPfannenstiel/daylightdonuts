import { FunctionComponent } from "react";
import classes from "./FeaturedItems.module.css";
import { FeaturedItem as FeaturedItemT } from "@_types/home";
import FeaturedItem from "./FeaturedItem";
import Arrow from "components/ui/Reusable/Arrow";
import Link from "next/link";
import MenuItem from "components/ui/Reusable/Menu/MenuItem";
import ArrowIcon from "components/ui/svg/ArrowIcon";
import ScrollList from "components/ui/Reusable/ScrollList";

interface FeaturedItemsProps {
  items: FeaturedItemT[];
}

const FeaturedItems: FunctionComponent<FeaturedItemsProps> = ({ items }) => {
  return (
    <ScrollList className={classes.items}>
      {items.map((item) => {
        return <FeaturedItem name={item.name} image={item.image} />;
      })}
      <MenuItem
        name="View Full Menu!"
        href="/menu"
        icon={<ArrowIcon />}
        linkText="View Menu"
      />
    </ScrollList>
  );
};

export default FeaturedItems;
