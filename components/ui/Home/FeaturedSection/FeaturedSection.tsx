import { FunctionComponent } from "react";
import classes from "./FeaturedSection.module.css";
import Heading from "components/ui/Reusable/Heading";
import { FeaturedItem } from "@_types/home";
import FeaturedItems from "./FeaturedItems";

interface FeaturedSectionProps {
  featuredItems: FeaturedItem[];
}

const FeaturedSection: FunctionComponent<FeaturedSectionProps> = ({
  featuredItems,
}) => {
  return (
    <section className={classes.featured}>
      <Heading>
        <h2>Featured Donuts</h2>
      </Heading>
      <FeaturedItems items={featuredItems} />
    </section>
  );
};

export default FeaturedSection;
