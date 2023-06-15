import { FunctionComponent } from "react";
import classes from "./FeaturedItems.module.css";
import { FeaturedItem as FeaturedItemT } from "@_types/home";
import FeaturedItem from "./FeaturedItem";
import Arrow from "components/ui/Reusable/Arrow";
import Link from "next/link";

interface FeaturedItemsProps {
  items: FeaturedItemT[];
}

const FeaturedItems: FunctionComponent<FeaturedItemsProps> = ({ items }) => {
  return (
    <ul className={classes.items}>
      {items.map((item) => {
        return <FeaturedItem name={item.name} image={item.image} />;
      })}
      <div className={classes.container}>
        <Link href={"/menu"}>{">"}</Link>
        <p>View our full selection</p>
      </div>
    </ul>
  );
};

export default FeaturedItems;
